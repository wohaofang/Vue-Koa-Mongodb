<template>
  <div class="comment-com">
    <!-- <p class="comment-com-title">留下点什么吧... <button class="logout" @click="logout">退出登录</button></p> -->
    <div class="wrap">
      <div class="user-info-box">
        <div class="user-avatar-box">
          <img :src="userInfo.avatar" alt="用户头像">
        </div>
        <p class="user-name">{{userInfo.name}}</p>
      </div>
      <div class="text-box">
        <textarea v-model="content" placeholder="最多150个字符"></textarea>
        <div class="text-box-tool">
          <button @click="publish">发表</button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { addComment } from "@/api/api";

export default {
  name: 'commentBox',
  data() {
    return {
      userInfo:{},
      content:''
    }
  },
  computed: {
    // avatar(){
    //   return th;
    // },
    // user_name(){
    //   return this.$store.state.user.user_name;
    // }
  },
  created(){
      this.userInfo = this.$getSession('userInfo')
    //   console.log(this.$getSession('userInfo'))
  },
  methods: {
    logout() {
      if(confirm("你真的要退出登录吗？")){
       this.$setSession('userInfo','')
        this.$router.push('/login');
      }
    },
    async publish(){
      if(this.content == ""){
        alert("你还是说点什么吧!");
        return;
      }
      if(this.content.length >= 150){
        alert("你说的太多了，最多只能输入150个字符哦。")
        return;
      }
        let param = {
            content: this.content,
            _id:this.userInfo._id
        }
        addComment(param).then(res=>{
            console.log(res)
            this.content = ''
            this.$emit('addList',res)
        })
    }
  }
}
</script>


<style lang="scss">
.comment-com {
  width: 800px;
  margin: auto;
  box-sizing: border-box;
  border: 1px solid #ccc;
  text-align: left;
  padding: 5px;
  .comment-com-title {
    font-size: 22px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    position: relative;
    .logout {
      background: transparent;
      position: absolute;
      top: 0;
      right: 0;
      border: 1px solid #ccc;
      padding: 8px 15px;
      font-size: 18px;
      outline: none;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .wrap {
    display: flex;
    overflow: hidden;
  }
  .user-info-box {
    width: 150px;
    min-width: 150px;
    text-align: center;
    img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
    }
    .user-name {
      font-size: 18px;
      font-weight: bold;
      margin-top: 10px;
    }
  }
  .text-box {
    flex: 1;
    box-sizing: border-box;
    padding: 0 5px;
    textarea {
      width: 100%;
      resize: none;
      font-size: 16px;
      line-height: 24px;
      height: 168px;
      word-break: break-all;
      padding: 5px;
      box-sizing: border-box;
      outline: none;
    }
    .text-box-tool {
      text-align: right;
      button {
        width: 80px;
        height: 40px;
        font-size: 18px;
        margin: 10px 0;
        border: none;
        background-color:#409eff;
        cursor: pointer;
        color: #fff;
        outline: none;
        &:hover {
          background-color: #66b1ff;
        }
      }
    }
  } 
}
</style>
