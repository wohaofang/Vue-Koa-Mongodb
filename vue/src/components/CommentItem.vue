<template>
    <div class="comment-item">
      <div class="user-info">
        <div class="avatar-box">
          <img :src='userInfo.avatar' alt="头像">
        </div>
        <div class="other-info">
          <p class="user-name">{{userInfo.name}}</p>
          <p class="create-time">{{format(item.create_time)}}</p>
        </div>
      </div>
      <div class="comment-content">留言 ： {{item.content}}</div>
      <!-- <div class="del-box" v-show="userInfo._id == $store.state.user._id">
        <span class="del-btn" @click="del_comment">删除</span>
      </div> -->
    </div>
</template>

<script>
import { format_date } from "@/utils/utils";
import { getUser } from "@/api/api";

export default {
  props: {
      item:{
          type:Object,
          default: {}
      }
  },
computed: {
    format(val){
      return function(val){
        return format_date(val);
      }
    },
   },
   data(){
       return{
           userInfo:{}
       }
   },
    created() {
        this.getUser(this.item.userId)
    },
    methods: {
    getUser(_id){
      getUser({_id}).then(res=>{
        this.userInfo = res
      })
    }
    },
}
</script>

<style lang="scss" >
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