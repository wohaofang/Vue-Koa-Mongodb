<template>
  <div class="home">
    <!-- <h1>Vue+Koa+Mongodb 留言板</h1> -->
    <CommentBox
      @addList="addList"
    />
    <CommentItem  v-for="(item,index) in commentList" :key="index"
      :item=item
    />
    <!-- <div class="comment-item"  v-for="(item,index) in commentList" :key="index">
      <div class="user-info">
        <div class="avatar-box">
          <img :src='item.obj.avatar' alt="头像">
        </div>
        <div class="other-info">
          <p class="user-name">{{item.obj.name}}</p>
          <p class="create-time">{{format(item.create_time)}}</p>
        </div>
      </div>
      <div class="comment-content">{{item.content}}</div>
      <div class="del-box" v-show="userInfo._id == $store.state.user._id">
        <span class="del-btn" @click="del_comment">删除</span>
      </div>
    </div> -->
  </div>
</template>

<script>
import CommentBox from "@/components/CommentBox"
import CommentItem from "@/components/CommentItem"

import { getComment,getUser } from "@/api/api";


export default {
  name: 'Home',
  components: {
    CommentBox,
    CommentItem
  },
  data(){
    return{
      commentList:[],
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
       getComment(this.page).then( res=>{
        this.commentList = res.list
      })
    },
    addList(data){
      this.commentList.unshift(data)
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


</style>
