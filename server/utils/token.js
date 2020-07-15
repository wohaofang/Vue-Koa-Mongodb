/**
 * @description: token
 * @author: Dm
 * @date: 2020-05-28
* */

const jwt = require('jsonwebtoken');
const {TOKEN_ENCODE_STR, URL_YES_PASS} = require('./keys');
const Checkcode = require('../db').Checkcode;
const User = require('../db').User

module.exports = {
    // 生成登录 token
    create_token(str){
        return jwt.sign({str},TOKEN_ENCODE_STR, {expiresIn: '1h'});
    },
     /*  
    验证登录 token 是否正确  => 写成中间件
    get 请求与设置的请求不拦截验证，其余均需登录
  */
  async check_token(ctx, next){
    let url = ctx.url;
    if( ctx.method == 'OPTIONS'){
        await next();
        return
    }
    if(ctx.method != 'GET' && !URL_YES_PASS.includes(url)){
      let token = ctx.get("Authorization");
      if(token == ''){
        // 直接抛出错误
        ctx.response.status = 401;
        ctx.response.body = "你还没有登录，快去登录吧!";
        return;
      }
      try {
        // 验证token是否过期
        let {str = ""} = await jwt.verify(token, TOKEN_ENCODE_STR);
        // 验证token与账号是否匹配
        let res = await User.find({userId:str,token});
        if(res.length == 0){
          ctx.response.status = 401;
          ctx.response.body = "登录过期，请重新登录!";
          return;
        }
        // 保存用户的_id，便于操作
        ctx._id = res[0]._id;
      }catch (e) {
        ctx.response.status = 401;
        ctx.response.body = "登录已过期请重新登录!";
        return;
      }
    }
    await next();
  },
}