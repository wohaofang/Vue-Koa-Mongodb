<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 @click="lala"> test </h1>
    <h1 @click="aaaa"> aaaa </h1>
  </div>
</template>



<script>
export default {
  methods:{
    lala(){
      console.log(123)
      throw new Error('aaaaaa1111')
    },
      aaaa(){
      console.log('aaaa')
      throw new Error('eqw哎')
    }
  },
  mounted(){

  }
}
</script>

<style>

</style>
