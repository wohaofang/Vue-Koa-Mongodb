<template>
  <div class="home">
    <!-- <h1>Vue+Koa+Mongodb 留言板</h1> -->
    <CommentBox
    />
  </div>
</template>

<script>
import CommentBox from "@/components/CommentBox"

export default {
  name: 'Home',
  components: {
    CommentBox
  }
}
</script>

<style lang="scss">
 h1{
    margin-bottom: 20px;
    text-align: center;
  }
</style>
