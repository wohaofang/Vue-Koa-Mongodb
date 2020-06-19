<template>
  <div>
    <div class="box">

    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="账号" prop="userId">
        <el-input v-model="ruleForm.userId"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pwd">
        <el-input
          type="password"
          v-model="ruleForm.pwd"
          autocomplete="off"
        ></el-input>
      </el-form-item>

      <el-form-item label="验证码" prop="code">
        <input class="ipt-captcha" v-model="ruleForm.code"/>
        <img class="captcha" @click="getCheckcode" :src="checkcodeImg"/>
      </el-form-item>
     


      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >登录</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="info" round @click="goRegister">注册</el-button>


      </el-form-item>
    </el-form>
    <h1 @click="test"> test </h1>
    </div>

    <!-- <el-button @click="showSome" type="primary">showSome</el-button>
    <el-button @click="getCheckcode" type="primary">getCheckcode</el-button>
    <el-button @click="login" type="primary">login</el-button> -->
  </div>
</template>
<script>
import * as test from "@/api/api";
export default {
  data() {

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } 
      callback();
    };
    var validateUserId = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } 
      callback();
    };

    var validateCaptcha= (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } 
      callback();
    };

    return {
      checkcodeImg:'',
      ruleForm: {
        userId: "",
        pwd: "",
        code: ""
      },
      rules: {
        userId: [{ validator: validateUserId, trigger: "blur" }],
        pwd: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCaptcha, trigger: "blur" }],
      }
    };
  },
  methods: {
    test(){
      console.log(12344)

      throw new Error("2222222")

    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login()
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    showSome() {
      //   console.log(getResult)
      test.getResult().then(res => {
        console.log(res);
      });
    },
    getCheckcode(){
      let _this = this
      test.getCheckcode().then(res => {
        this.checkcodeImg = res.img
        _this.$setSession('token',res.token)
        console.log(res);
      });
    },
    login(){
      let params = {...this.ruleForm}
      console.log(params)
      test.login(params).then(res => {
        this.$setSession('userInfo',res)
        this.$router.push('/home');
      }).catch(res=>{
        this.getCheckcode();
        console.log(res)
      })
    },
    goRegister(){
      this.$router.push({
        path: 'register'
      })
    }
  },
  mounted() {
    // this.getCheckcode()
  }
};
</script>

<style>
.box{
      width: 600px;
      margin: 100px auto;
      box-sizing: border-box;
      box-shadow: 0 0 30px #ccc;
      padding: 30px;
}
.ipt-captcha{
  width: 200px;
  height: 40px;
}
.captcha{
    width: 120px;
    height: 40px;
    cursor: pointer;
    margin-left: 50px;
}
.el-form-item__content{
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
}
</style>
