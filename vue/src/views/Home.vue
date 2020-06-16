<template>
  <div class="home">
    <!-- <h1>Vue+Koa+Mongodb 留言板</h1> -->
    <CommentBox
    />
    <div class="comment-item"  v-for="(item,index) in commentList" :key="index">
      <div class="user-info">
        <div class="avatar-box">
          <img :src='item.avatar' alt="头像">
        </div>
        <div class="other-info">
          <p class="user-name">{{item.name}}1111</p>
          <p class="create-time">{{format(item.create_time)}}</p>
        </div>
      </div>
      <div class="comment-content">{{item.content}}</div>
      <!-- <div class="del-box" v-show="userInfo._id == $store.state.user._id">
        <span class="del-btn" @click="del_comment">删除</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import CommentBox from "@/components/CommentBox"

import { getComment,getUser } from "@/api/api";
import { format_date } from "@/utils/utils";


export default {
  name: 'Home',
  components: {
    CommentBox
  },
  data(){
    return{
      commentList:[
        { 
          name:'haha',
          content:123,
          create_time:'1591345765920'
        }
      ],
      page: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
   computed: {
    format(val){
      return function(val){
        return format_date(val);
      }
    },
   },
  methods: {
    getComment(){
      getComment(this.page).then(res=>{
        console.log(res)
        this.commentList = res.list
      })
    },
    getUser(_id){
      getUser({_id}).then()
    }
  },
  mounted() {
    this.getComment()
  },
  created() {
    
  },
}
</script>

<style lang="scss" >
 h1{
    margin-bottom: 20px;
    text-align: center;
  }
.comment-item {
  width: 800px;
  // min-height: 130px;
  margin: 20px auto;
  text-align: left;
  box-shadow: 0 0 10px #ccc;
  padding: 10px 5px;
  box-sizing: border-box;
  transition: box-shadow .6s;
  position: relative;
  &:hover {
    cursor: pointer;
    box-shadow: 0 5px 20px #ccc;
  }
  .user-info {
    display: flex;
    .avatar-box {
      // float: left;
      width: 60px;
      min-width: 60px;
      height: 60px;
      img {
        width: 60px;
        border-radius: 50%;
      }
    }
    .other-info {
      // float: left;
      // flex: 1;
      padding-left: 10px;
      .user-name {
        font-size: 22px;
        line-height: 40px;
        font-weight: bold;
        margin: 0;
      }
      .create-time {
        font-size: 14px;
        line-height: 20px;
        margin: 0;
      }
    }
  }
  .user-info::after{
    content: '';
    overflow: hidden;
    clear: both;
  }
  .comment-content {
    padding: 10px 5px;
    font-size: 14px;
    word-break: break-all;
  }
  .del-box {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 50px;
    transition: width .6s;
    font-size: 18px;
    background-color: rgba(245,108,108,.8);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 5px #ccc;
    &:hover {
      width: 100%;
    }
    .del-btn {
      &:hover {
        font-weight: bold;
      }
    }
  }
}

</style>
