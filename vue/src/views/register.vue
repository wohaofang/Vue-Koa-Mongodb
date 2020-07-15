<template>
  <div class="register">
    <div class="box">
      <div class="avatar-box">
        <!-- <img class="avatar-show" :src="formLabelAlign.avatar" alt="上传头像" /> -->
        <!-- <el-avatar :size="50" :src=""> -->
        <div class="block block1"><el-avatar :size="80" :src="formLabelAlign.avatar" alt="上传头像"></el-avatar></div>
        <label class="upload-img-btn" for="upload-img">上传图片</label>
        <input id="upload-img" type="file" @change="upload_img" />
      </div>
      <el-form
        :label-position="'right'"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="称呼">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="账号">
          <el-input v-model="formLabelAlign.userId"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formLabelAlign.pwd"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="formLabelAlign.pwd2"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <input class="ipt-captcha" v-model="formLabelAlign.code" />
          <img class="captcha" @click="getCheckcode" :src="checkcodeImg" />
        </el-form-item>
        <el-form-item>
          <el-button @click="submit" type="primary">注册</el-button>
          <el-button @click="goLogin" type="info"
            >已有账号，返回登录页</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="cropper-img-box" v-if="cropper_box_mark == true">
      <vueCropper
        ref="cropper"
        :img="cropperData.img"
        :autoCrop="cropperData.autoCrop"
        :autoCropWidth="cropperData.autoCropWidth"
        :autoCropHeight="cropperData.autoCropHeight"
        :fixedBox="cropperData.fixedBox"
      ></vueCropper>
      <div class="cropper-img-tool">
        <button class="cropper-img-tool-btn" @click="rotateRight">
          顺时针90°
        </button>
        <button class="cropper-img-tool-btn" @click="finish">确认</button>
        <button class="cropper-img-tool-btn" @click="cropper_box_mark = false">
          取消
        </button>
        <button class="cropper-img-tool-btn" @click="rotateLeft">
          逆时针90°
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCheckcode ,register} from "@/api/api";
// import VueCropper from "vue-cropper";
// import VueCropper from 'vue-cropperjs';
// import 'cropperjs/dist/cropper.css';
export default {
  //   components: { VueCropper },
  data() {
    return {
      cropperData: {
        img: "",
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      cropper_box_mark: false,
      img_base64: "",
      formLabelAlign: {
        avatar: "",
        name: "",
        pwd: "",
        pwd2: "",
        userId: "",
        token:""
      },
      checkcodeImg: ""
    };
  },
  methods: {
    goLogin() {
      this.$router.push({
        path: "login"
      });
    },
    submit() {
        if(this.formLabelAlign.name == '' || this.formLabelAlign.userId == "" || this.formLabelAlign.pwd == ""){
        alert('注册失败，请填写完整表单');
        return;
      }
      if(this.formLabelAlign.avatar == ''){
        alert("注册失败，请上传头像！");
        return;
      }
      if(this.formLabelAlign.pwd.length < 5){
        alert("注册失败，密码最少为5位");
        return;
      }
      if(this.formLabelAlign.pwd != this.formLabelAlign.pwd2){
        alert('注册失败，2次密码输入不一致!');
        return;
      }
      register(this.formLabelAlign).then(res=>{
        this.$setSession('userInfo',res)
        this.$router.push('/home');
      })
      .catch(res=>{
        this.getCheckcode();
        console.log(res)
      })

    },
    getCheckcode() {
      let _this = this;
      getCheckcode().then(res => {
        this.checkcodeImg = res.img;
        this.formLabelAlign.token = res.token;
        _this.$setSession("token", res.token);
        // console.log(res);
      });
    },
    upload_img(e) {
      let obj = e.target;
      let file = obj.files[0];
      let temArr = file.name.split(".");
      let file_suffix = temArr[temArr.length - 1];
      if (
        file_suffix != "jpg" &&
        file_suffix != "png" &&
        file_suffix != "jpeg"
      ) {
        alert("上传图片失败，目前只支持jpg,png,jpeg的图片!");
        return;
      }
      let reader = new FileReader();
      let _self = this;
      reader.onload = function(ev) {
        _self.$nextTick(() => {
          _self.cropperData.img = ev.target.result;
          _self.cropper_box_mark = true;
        });
      };
      reader.readAsDataURL(file);
    },
    rotateRight() {
      this.$refs.cropper.rotate(45);
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    finish() {
      this.$refs.cropper.getCropData(data => {
        this.formLabelAlign.avatar = data;
        this.cropper_box_mark = false;
      });
    }
  },
  mounted() {
    this.getCheckcode();
  }
};
</script>

<style lang="scss" scoped>
.block1{
  margin: 0 auto;
  text-align: center;
}
.avatar-box {
  flex: 1;
  height: 200px;
}
#upload-img {
  opacity: 0;
  display: none;
}
.upload-img-btn {
  width: 100px;
  border: 1px solid #ccc;
  display: block;
  padding: 5px 15px;
  transform: translateY(40%);
  margin: 5px auto;
  cursor: pointer;
}
.form-itme-avatar {
  height: auto;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.avatar-show {
  margin: 0 auto;
  display: block;
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.cropper-img-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.cropper-img-tool {
  position: absolute;
  z-index: 2;
  bottom: 20px;
  left: 0;
  text-align: center;
  width: 100%;
  .cropper-img-tool-btn {
    width: 140px;
    height: 50px;
    font-size: 18px;
    cursor: pointer;
    & + .cropper-img-tool-btn {
      margin-left: 50px;
    }
  }
}
</style>
