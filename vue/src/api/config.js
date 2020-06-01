import Vue from "vue";
import axios from "axios";

// 全局设置
// axios.defaults.timeout = 10000; // 时间超时设置10s
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// const getHeaders = async () => {
//     const result = getSession('headers')
//     if (result) {
//       return result
//     }
//     return new Promise((resolve) => {
//       Vue.prototype.bus.$on('next', () => {
//         resolve(getSession('headers'))
//       })
//     })
//   }

class DAxios {
  constructor(config = {}) {
    this.headers = {
      "content-type": "application/json;charset=UTF-8"
    };
    this.timeout = 10000;
    this.ipUrl = config.ipUrl;
  }

  async post(url, data, header = {}) {
    const _this = this;
    const baseURL = process.env.VUE_APP_API_HOST;
    // const commonHeader = await getHeaders()
    return axios({
      method: "POST",
      url,
      data:{
        ...data,
        token: Vue.prototype.$getSession('token')
      },
      baseURL,
      headers: {
        // ...commonHeader,
        ..._this.headers,
        ...header
      },
      timeout: _this.timeout
    })
    .then(({data:{code,data,msg}})=>{
      if(code !== 200){
          return Promise.reject(msg);
      }
      return Promise.resolve(data)
    })
      .catch(function(err) {
        return Promise.reject(err);
      });
  }
  async get(url, data, header = {}) {
    const _this = this;
    const baseURL = process.env.VUE_APP_API_HOST;
    // const commonHeader = await getHeaders()
    return axios({
      method: "get",
      url,
      data:{
        ...data,
        token: Vue.prototype.$getSession('token')
      },
      baseURL,
      // headers: {
      //   // ...commonHeader,
      //   ..._this.headers,
      //   ...header
      // },
      timeout: _this.timeout
    })
    .then(({data:{code,data}})=>{
        if(code !== 200){
            return Promise.reject("未知错误");
        }
        return Promise.resolve(data)
    })
    .catch(function(err) {
        
        return Promise.reject(err);
        });
  }
}

export default new DAxios();
