<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active, .fade-leave-active {
    transition: opacity 2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
    opacity: 0
}
</style>
<template>
  <d2-container type="card" better-scroll ref="container">
    <el-input v-model="text" placeholder="请输入"></el-input>
    {{scrollTop}}
    <br/>
        登鹳雀楼
        <br/>
   白日依山尽，黄河入海流。
   <br/>
   欲穷千里目，更上一层楼。
   <br/>
《登鹳雀楼》是唐代诗人王之涣（一作朱斌诗） 1.创作的一首诗。此诗前两句写的是自然景色，但开笔就有缩万里于咫尺，使咫尺有万里之势；后两句写意，写的出人意料，把哲理与景物、情势溶化得天衣无缝。诗人受大自然震撼的心灵，悟出的是朴素而深刻的哲理，能够催人抛弃固步自封的浅见陋识，
登高放眼，不断拓出愈益美好的崭新境界。清代诗评家认为：“王诗短短二十字，前十字大意已尽，后十字有尺幅千里之势。”这首诗是唐代五言诗的压卷之作，王之涣因这首五言绝句而名垂千古，鹳雀楼也因此诗而名扬中华。
此诗虽然只有二十字，却以千钧巨椽，绘下北国河山的磅礴气势和壮丽景象，气势磅礴、意境深远，千百年来一直激励着中华民族昂扬向上。特别是后二句，常常被引用，借以表达积极探索和无限进取的人生态度。时至今日，此诗还不时出现在中国国家重大政治和外交场合。
  <br/>
  <el-button @click="$refs.container.scrollBy(0, 30)">
    向下滚动 30 像素
  </el-button>
  <br/>
<el-input v-model="text"></el-input>
<br/>
<d2-highlight code="alert('Hello')"/>
<div class="display:inline">
  <p>inpu 元素：</p>
  <el-input v-model="message" placeholder="编辑我...."></el-input>
  <p>消息是：{{message}}</p>
  <p>textarea 元素：</p>
  <p style="white-space: pre">{{message2}}</p>
  <textarea v-model="message2" placeholder="多行文本输入...."></textarea>
  <li v-for="item in sites">
      {{item.name}}
  </li>
  <ul>
    <li v-for="value in object">
      {{ value }}
    </li>
  </ul>
  <ul>
    <li v-for="(value,key,index) in object">
      {{index}}.{{key}}:{{value}}
    </li>
  </ul>
  <div class="text item">
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-button v-on:click="greet">确定</el-button>
      <el-button v-on:click="counter += 1">确定</el-button>
      <el-button v-on:keyup.enter="submit">取消</el-button>
    </el-form-item>
   <p>这个按钮被点击了 {{ counter }} 次。</p>
   <div>
    <p>单个复选框</p>
    <el-checkbox id="checkbox" v-model="checked">{{checked}}</el-checkbox>

    <p>多个复选框</p>
    <input type="checkbox" id="runoob" value="Runoob" v-model="checkedNames">Runoob</el-checkbox>
    <input type="checkbox" id="google" value="Google" v-model="checkedNames">Google</el-checkbox>
    <input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">taobao</el-checkbox>
    <br/>
    <span>选择值为：{{checkedNames}}</span>
    <br/>
    <el-select v-model="selected" name="fruit" placeholder="">
      <el-option  value="">选择一个网站</el-option>
      <el-option  value="www.baidu.com">Baidu</el-option>
      <el-option  value="www.google.com">Google</el-option>
    </el-select>
    <div id="output">
        选择的网址是：{{selected}}
    </div>
   </div>

   <div>
     <div id="counter-event-example">
       <p>{{total}}</p>
       <el-button v-on:click="incrementTotal">{{total}}</el-button>
     </div>
   </div>

   <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  
  <div>
    <el-button type="string" v-on:click="show = !show">点我</el-button>
    <transition name="fade">
      <p v-show="show" v-bind:style="styleobj">动画实例</p>
    </transition>
  </div>
  <div>
    <el-button type="string" v-on:click="show = !show">确定</el-button>
    {{info}}
  </div>
  </el-form>
  </div>
</div>
  <template slot="footer">footer</template>
  </d2-container>
</template>

<script>
import { response } from "@/api/tools"
import axios from 'axios'
  export default{
    data(){
      return{
        scrollTop:0,
        message:'白日依山尽，黄河入海流',
        text:'<p>Hello World Vue</p>',
        message2:'百度地址\r\nhttp://www.baidu.com',
        counter:0,
        sites:[
          {name:'Taobao'},
          {name:'Google'},
          {name:'Baidu'},
        ],
        object:[
          {name:'阿三'},
          {address:'广州'},
          {email:'123456789@qq.com'},
        ],
        checked:false,
        checkedNames:[],
        selected:'',
        total:0,
        show:true,
        styleobj:{
          fontSize:'30px',
          color:'red'
        },
        l
      }
    },
    mounted(){

      axios.get('https://www.runoob.com/try/ajax/json_demo.json')
        .then(response =>(this.info = response)
        .catch(function(error){
          console.log(error);
        }));
    },
    methods:{
      greet:function(event){
        alert('hello'+this.message+'!')
      },
      incrementTotal:function(){
        this.total+=1
      },
      getContentById() {}
    },
  }
</script>