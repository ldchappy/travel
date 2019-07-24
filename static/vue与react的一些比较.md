###vue与react的一些比较
两者本质的区别：模板和组件化的区别

Vue本质是MVVM框架，由MVC发展而来；
React是前端组件化框架，由后端组件化发展而来；
Vue使用模板
React使用JSX
React本身就是组件化
Vue是在MVVM上扩展的
共同点：都支持组件化，都是数据驱动视图

####生命周期
~~~
vue生命周期：初始化--挂载--更新--销毁

beforeCreate,初始事件和生命周期之前
created，初始化注入

beforeMount，挂载之前
mounted, 挂载渲染     URL请求

beforeUpdate,重新渲染之前
updated,重新渲染之后

beforeDestroy,销毁之前
destroyed,销毁之后
----------------------------------
react生命周期：
componentWillMount 组件将要加载
componentDidMount 组件加载完成  URL请求

componentWillReceiveProps 将要接收父组件传来的props
shouldComponentUpdate 子组件是不是应该更新

componentWillUpdate 组件将要更新
componentDidUpdate 组件更新完成

componentWillUnmount 组件即将销毁
~~~

#### 组件
~~~
vue组件
全局组件
Vue.component('TodoItem',{
    template: "<li>" + {{content}} + "</li>",
    props: ['content']
})
<todo-item v-bind:content="item" v-for="item in list"></todo-item>

局部组件
var TodoItem = {
    props: ['content'],
    temponent: "<li> {{content}} </li>"
}
var vm = new Vue({
    el: "#app",
    component:{TodoItem: TodoItem}
})

react组件
基础组件
function Component(){
    return <li>content</li>
}
es6写法组件
class Component extends React.Component{
    render(){
        return <li>content</li>
    }
}
~~~

####组件通信
~~~
####vue组件通信
1.props和$emit
父组件向子组件传递数据是通过props传递的，子组件传递数据给父组件是通过$emit触发事件来做到的。
父组件：
<child v-on:getChildData="getChildData">
methods:{
    getChildData(val){ console.log(val) }
}
子组件：
props:['message'], // 得到父组件传来得数据
methods:{
    passData(val){
        // 使用$emit触发父组件中的事件
        this.$emit('getChildData', val)
    }
}
2.$attrs和$listeners 
解决祖孙组件通信 A - B - C
祖组件A：
<B :messagec="messagec" v-on:getCData="getCData" v-on:getChildData="getChildData(message)"></B>
methods:{
    // B组件触发的事件
    getChildData(val){ console.log(val) }
    // C组件触发的事件
    getCData(val){
        console.log(val)
    }
}
父组件B:
<C v-bind="$attrs" v-on="$listeners"></C>

子组件C：
使用$attrs.来获得祖组件传来得数据
使用$emit()来触发祖组件的事件，因为父组件中定义了$listeners
<input v-model="$attrs.messagec" @input="passCData($attr.messagec)"/>
methods:{
    passCData(val){
        this.$emit('getCData', val)
    }
}

3.中央事件总线 -- 兄弟组件
新建一个Vue事件 bus对象，然后通过 bus.$emit 触发事件，bus.$on 监听触发的事件
e.g: brother1 传值给 brother2
var bus = new Vue()
brother1:
methods:{
    passData(val){ bus.$emit('globalEvent', val) }
}
brother2:
methods:{
    bus.$on('globalEvent',(val) => {
        this.brothermessage = val
    })
}
4. provide 和 inject  --- 深层父子组件传值
父组件中通过provider来提供变量，然后在子组件中通过inject来注入变量
Vue.component('child',{
    inject: ['for'],
})
Vue.component('parent',{
    provide: {
        for: 'test'
    }
})

5. v-model  -- 自动传递value的prop属性，子组件通过this.$emit('input',val)修改
子组件：
props:{
    value: String,//v-model会自动传递一个字段为value的prop属性
}
methods:{
    changeValue(){
        this.$emil('input',this.message)
    }
}
父组件：
<Chile v-model="message"></Child>

6. $parent和$children --- 不说了

#### React组件通信
父 --> 子：props
父组件： <Sub title="nihaoa" />
子组件： props.title

子 --> 父：回调函数
子组件：
const cb = (msg) => {
    return () => {
        props.callback(msg)
    }
}
<button onClick = { cb("我们通信把") }>点击我</button>
父组件:
<Sub callback = { this.callback.bind(this) } />

跨级组件通信   使用 context 对象
使用 context 也很简单，需要满足两个条件：
1.上级组件要声明自己支持 context，并提供一个函数来返回相应的 context 对象
2.子组件要声明自己需要使用 context
父组件 App.js:
 // 父组件声明自己支持 context
static childContextTypes = {
    color:PropTypes.string,
    callback:PropTypes.func,
}

// 父组件提供一个函数，用来返回相应的 context 对象
getChildContext(){
    return{
        color:"red",
        callback:this.callback.bind(this)
    }
}

callback(msg){
    console.log(msg)
}
子组件 Sub.js: <SubSub />
子组件的子组件 SubSub.js:
// 子组件声明自己需要使用 context
static contextTypes = {
    color:PropTypes.string,
    callback:PropTypes.func,
}
render(){
    const style = { color:this.context.color }
    const cb = (msg) => {
        return () => {
            this.context.callback(msg);
        }
    }
    return(
        <div style = { style }>
            SUBSUB
            <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
        </div>
    );
}
~~~

####vue计算属性
~~~
<div id="#app"> {{fullName}}</div>
<script>
    var vm = new Vue({
        el: "#app",
        data: {
            firstName: "Dell",
            lastName: "Lee"
        },
        computed:{
            fullName: function(){
                return this.firstName + this.lastName
            }
        }
    })
</script>
计算属性有内置的缓存，如果计算属性依赖的值不改变，则取缓存的数据显示
~~~

#### vue方法
~~~
<div id="app">{{fullName()}}</div>
<script>
var vm = new Vue({
    el: "#app",
    data: {
        FName: 'Dell',
        LName: 'Lee'
    },
    methods: {
        fullName: function(){
            return this.FName + this.LName
        }
    }
})
</script>
方法没有缓存机制
~~~

#### vue侦听属性
~~~
<div id="app">{{fullName}}</div>
<script>
var vm = new Vue({
    el: '#app',
    data: {
        firstName : 'Dell',
        lastName: 'Lee',
        fullName: 'DellLee'
    },
    watch: {
        firstName: function(){
            this.fullName = this.firstName + this.lastName
        },
        lastName: function(){
            this.fullName = this.firstName + this.lastName
        }
    }
})
</script>
~~~

####ref
~~~
vue中的ref
在html中使用ref定义，在实例中可用this.$refs.xxx来获得所在定义的元素或组件

react中的ref
Refs三种方式
字符串模式 ：废弃不建议使用
回调函数
React.createRef() ：React16.3提供

字符串模式：<input ref="inputEl"/>
回调函数：
function Input(props) {
  return (<div>
      <input ref={props.inputRef} /> ***
    </div>);
}

class InputBox extends React.Component {
 _ref = (el)=>{   ***
     this.inputElement = el
 }
  render() {
    return (
      <Input inputRef={this._ref} />  ***
    );
  }
}
评语：为了绑定一个组件（元素）需要写一个函数，冗余冗余冗余

React.createRef()：使用React.createRef()创建refs通过ref属性来获得React元素
class Test extends React.Component{
    myRef = React.createRef();
    componentDidMount(){
      // 访问ref
      const dom = this.myRef.current
    }
    render(){
        return (
            <div ref={this.myRef}/>
        )
    }
}
~~~

####组件参数校验与非props特性
~~~
vue中的校验 => 子组件有权对父组件传来的参数进行校验
原来是：props：['content']
现在校验单个： props: { content:String } // 传来的只能是String
校验多个：props: {content:[String,Number]}// 传来的只能是String或Nmuber
复杂校验：props:{ content:{type:String,required: true,default:'默认值'}}
            指定String   指定必传   指定默认值
更复杂的：props:{
    content:{
        type:String, //指定String
        validator:function(value){
            return (value.length > 5) //指定传来的长度大于5
        }
    }
}

props特性就是使用props来接受参数，可使用{{xxx}}、this.xxx 来使用
非props特性就是没有使用props来接受参数，所以
1.不能使用 属性名
2.会在子组件的html标签中显示，不会作为内容显示
~~~

react -PropTypes 
~~~
static propTypes = {
    comment: PropTypes.object
  }
PropTypes 提供一系列验证器，可用于确保组件接收到的数据类型是有效的
~~~

事件处理
~~~
vue事件处理 
在元素上定义 v-on 事件，在methods里处理事件逻辑

-- 给组件(组件名定义的那个)绑定原生事件
<Child @click.native = "handleClick"></Child>

react事件处理
事件处理方式一
1.在constructor绑定this this.handleClick = this.handleClick.bind(this)
2.在元素上定义 onClick={this.handleClick}
3.写定义的事件的逻辑

事件处理方式二
在事件处理逻辑上使用箭头函数
 handleClick = () => {   ****
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }

  事件处理方式三
  回调中使用箭头函数
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return (
      <button onClick={(e) => this.handleClick(e)}>  ****
        Click me
      </button>
    );
  }
~~~

插槽与children
~~~
在Vue中使用插槽<slot>,使用场景：有一部分内容是父组件传来显示的
简单的插槽：
① 在父组件中的子组件声明名称里直接写内容代码
② 在子组件的模板内容中写上 <slot> 标签
<div id="root">
    <child>
        <h1>插槽进来的内容</h1>
    </child>
</div>
Vue.component('child',
    {template: `
        <div>Hello</div><slot></slot>
    `}
)
具名插槽：插入的内容有slot名称，使用的内容有名称
<div id="root">
    <body-content>
        <div slot="header">Header</div>
        <div slot="footer">Footer</div>
    </body-content>
</div>
Vue.component('body-content',
    {template:`
        <div>
            <slot name="header"></slot>
            <div>content</div>
            <slot name="footer"></slot>
        </div>
    `}
)
作用域插槽：多个地方使用，但内容形式不同
父组件固定写法：<template slot-scope="xxx"></template>
子组件 <slot>xxx</slot>  里面的 :item 是传到父组件的别名
<div id="root">
    <child>
        <template slot-scope="props">
            <h1>{{props.item}} -- hello</h1>
        </template>
    </child>
</div>
Vue.component('child',{
    data: function(){
        return {
            list: [1,2,3,4,5]
        }
    },
    template:`
        <div>
            <ul>
                <slot v-for="item in list" :item=item></slot>
            </ul>
        </div>
    `
})

React中的组合组件  使用 children
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

---------------------------------------
#### React 中没有“槽”这一概念的限制，你可以将任何东西作为 props 进行传递
function Contacts() { return <div className="Contacts" />; }
function Chat() { return <div className="Chat" />; }

function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App() {
  return (
    <SplitPane
      left={
        <Contacts />
      }
      right={
        <Chat />
      } />
  );
}
---------------------------------------
~~~

vue动画
~~~
1.想要某元素进行动画效果，使用<transition>包裹
<transition name="fade"><div>xxxx</div></transition>
2.在样式上增加xx-enter/xx-enter-active/xx-leave-to/xx-leave-active
v-enter：定义进入过渡的开始状态
v-enter-active：定义进入过渡生效时的状态
v-enter-to: 定义进入过渡的结束状态
v-leave: 定义离开过渡的开始状态
v-leave-active：定义离开过渡生效时的状态
v-leave-to: 定义离开过渡的结束状态
~~~

路由
~~~
Vue-router 核心
** 路由跳转的方式
<router-link to=' '></router-link> 和 this.$router.push({path:' '})
** 动态路由匹配
动态路由路径参数，以冒号开头
const router = new Router({
    routes:[{
        path: '/helloworld/:id', //动态路由路径参数
        props: true, // 可当做组件的props使用
        name: 'HelloWorld',  // 通过name进行跳转
        component: HelloWorld
    }]
})
** 获取路由的参数
this.$route.params.id

** 响应路由参数的变化
方式一：导航守卫 beforeRouteUpdate(to,from,next){}
方式二：watch监测$route的变化

** 嵌套路由
routes:[
    {
        ......
        children:[{ ...... }]
    }
]

** 编程式的导航 this.$router.push({path:''})
router.push('home')  ；// 字符串
router.push({path:'home'})；  // 对象
router.push({name:'user',params:{userId:123}})；  // 命名的路由
router.push({path:'register',query:{plan:'private'}})；// 带查询参数，变成 /register?plan=private ，获取this.$route.query.plan

全局前置守卫 router.beforeEach  
每个守卫方法接收三个参数：
to: Route: 即将要进入的目标 路由对象                        
from: Route: 当前导航正要离开的路由                        
next: Function: 一定要调用该方法来 resolve 这个钩子

React-router
** 路由跳转的方式
<Link to={{ pathname:`/a/b/${qwer}`,query:{state: 12,sourceId:34}}}>
Route文件里的path:'/:Id',在跳转后的页面，可以这样拿到参数：
/:Id ---> this.props.params.id
query的参数 ---> 
this.props.location.query.state
this.props.location.query.sourceId

hasHistory.push定义跳转链接，传参state:record
在别的页面获取使用：const {state:query} = this.props.location
~~~

Redux 与 Vuex
~~~
Redux:
① 创建store，使用Provider包裹
② 创建reducer，获得Action发来的动作和state，改变state的值
③ 创建Action，使用despatch发出用户动作，发出给Reducer, 
④ 创建容器组件，使用connect来连接 组件和store，把改变后的state存放在一个变量中
Provider和connect
<Provider/>组件，能够使你的整个app访问到Redux store中的数据
<Provider store={store}>
    <App />
  </Provider>,

提供一个connect方法能够让你把组件和store连接起来
connect( mapStateToProps, mapDispatchToProps )(Counter)

Store/Action Creators/Reducers/Action Types/Selectores

** 创建Store，为了包裹store
需要让store成为我们app中可访问的对象，将用React-Redux提供给我们的<Provider/>组件包裹
const store = createStore(rootReducer)
<Provider store={store}> <App /> </Provider>

/reducer/index.js
combineReducers({ documentManageReducer })

Reducer ---- documentManageReducer.js
===> 这里是获得Action发来的动作和state，根据需要来改变state的值
===> state改变之后的值以 documentManageReducer(上面combineReducers包裹)存在于页面中
export default documentManageReducer(state = initalState, action){
    switch(action.type){
        case TYPE.GET_LIST_DATA:{
            return {
                ...state,
                data: action.result.data,
                total: action.result.total,
                current: action.result.pageNo,
                pageSize: action.result.pageSize
            }
        }
        default: { return state }
    }
}

Action ---------  documentManageAction.js
这里是用户动作发出给documentManageReducer, 使用despatch发出
export function getDocumentList(params){
    return async dispatch => {
        dispatch({ type: TYPE.LOADING_TRUE })
        const result = await apiFetch(URL.DOCUMENT_LIST,{
            data: { ...params }
        })
        dispatch(receiveList(result))
        dispatch({ type: TYPE.LOADING_FALSE })
    }
}

container  ---- 页面容器组件，使用connect来连接组件和store
container/DocumentManage.jsx

// 这里传进来的state是Main.jsx里的
// documentManage 是rootReducer.jsx里的
// 把state.documentManage.documentManageReducer 绑定到 documentManageReducer
const mapStateToProps = state => {
    // 把state变成documentManageReducer存在于页面中
    documentManageReducer: state.documentManage.documentManageReducer
}
// 把 action/documentManageAction里的action，绑定到 documentManageAction
const mapDispatchToProps = dispatch => ({
    documentManageAction: bindActionCreators(documentManageAction, dispath)
})

//把上面的documentManageReducer(新的state)、documentManageAction(新的action)
//使用connect并联给DocumentManage，再以props传给子组件<DocumentList {...props}>
export default connect(mapStateToProps,mapDispatchToProps)(DocumentManage)

** 连接组件
connect方法使你可以从Redux store中读取数据
可选参数：
mapStateToProps：每当store state发生变化时，就被调用。
mapDispatchToProps：这个参数可以是一个函数或对象

VueX
store：一个放到vue实例里的 Vuex的store 对象
----------------
Vue.use(Vuex)
const store = new Vuex.Store({})
export default store
---
import store from './store'
new Vue({
    el:'#app',
    store,   ****
})
-----------

state:
vuex中的数据源，页面上可以通过this.$store.state来获取我们定义的数据
-----------
const store = new Vuex.Store({
    state: { count: 1}
})
-----------

Getters：
用于监听state中的值的变化，返回计算后的结果
页面上可以通过this.$store.getters.xxxx来获取
-----------
const store = new Vuex.Store({
    state:{ count: 1},
    getters:{
        getStateCount: function(state){ return state.count + 1 }
    }
})
-----------

Mutations:
修改store中的值的唯一方法，在页面的方法中使用this.$store.commit()来调用Mutations里的方法
如：页面上有addFun方法，在addFun方法里调用Mutations里的方法
-----------
页面上的addFun方法：
methods:{
    addFun: function(){
        this.$store.commit('add')
    }
}
Mutations里的方法：
const store = new Vuex.Store({
    state: { count : 1},
    getters: {
        getStateCount: function(state){ return state.count + 1}
    },
    mutations:{
        add(state){ state.count = state.count + 1 }
    }
})
-----------

Actions:
提交一个actions，在actions中提交mutation再去修改状态值
在页面的方法中使用this.$store.dispatch()来调用 Actions 里的方法
-----------
const store = new Vuex.Store({
    state: {count : 1},
    getters:{
        getStateCount: function(state){ return state.count + 1}
    },
    mutations:{
        add(state){ state.count = state.count + 1}
    },
    actions:{
        addFun(context){
            context.commit('add')
        }
    }
})
---
methods:{
    addFun(){
        this.$store.dispatch('addFun')
    }
}
-----------

mapState/mapGetters/mapActions
代替this.$store.state.count/this.$store.dispatch('addfun')这些写法
------------
methods:{}
computed:{
    ...mapState({
        count1: state => state.count
    })
}
---
<div style="border">
    {{count1}}
</div>
~~~












