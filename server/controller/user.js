
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const xss = require('xss')

const {create_token} = require('../utils/token');
const { DM_ENCODE_STR,TOKEN_ENCODE_STR } = require('../utils/keys');
let Checkcode = require('../db').Checkcode
const User = require('../db').User;

// 验证 验证码 token 与 code 是否正确
async function check_token_code({token,code}){
    console.log(11123123123123,code)
try {
    // 验证码转大写
    code = code.toUpperCase();
    await jwt.verify(token, TOKEN_ENCODE_STR);
  
    // 读数据库，删除验证码
    let res = await Checkcode.findOneAndDelete({token,code});
    
    if(res == null){
        return false;
    }
    }catch (e) {
        return false;
    }
    return true;
}

module.exports = {
    async login(ctx,next){
        let {userId = '', pwd = '' , code = "" ,token} = ctx.request.body;
        let dToken = token
        try {
            if(userId == '' || pwd == ''){
                ctx.body = {
                    code: 401,
                    msg: "登录失败，请输入登录账号或密码!"
                }
                return 
            }
            
            // 验证码判断
            let mark = await check_token_code({token:dToken,code})
            if(!mark){
                ctx.body = {
                    code: 401,
                    msg: '登录失败，验证码错误'
                }
                return
            }
            // 判断账号密码
            pwd = sha1(sha1(pwd+DM_ENCODE_STR))
            let res = await User.find({userId,pwd});
            let token = create_token(userId);
            res[0].token = token;
            res[0].save();

            ctx.body = {
                code: 200,
                msg: "登录成功!",
                data: {
                    _id: res[0]._id,
                  name: res[0].name,
                  avatar: res[0].avatar,
                  token
                }
              }
        } catch (e) {
            console.log(e)
            ctx.body = {
                code: 500,
                msg: "注册失败，服务器异常!"
            }
        }
    },
    async register(ctx,next){
        let {name = '', userId =　'', pwd = '', avatar = "", code = '',token} = ctx.request.body;
        let code_token = token
        try {
            if(name == '' || userId == "" || pwd == ""){
                ctx.body = {
                  code: 401,
                  msg: "注册失败，请填写完整表单!"
                }
                return;
              }
              if(avatar == ''){
                ctx.body = {
                  code: 401,
                  msg: "注册失败，请上传头像!"
                }
                return;
              }
              if(pwd.length < 5){
                ctx.body = {
                  code: 401,
                  msg: '注册失败，密码最少为5位！'
                }
                return;
              }
                // 验证码判断
        console.log(code_token)

            let mark = await check_token_code({token:code_token,code});
            if(!mark){
                ctx.body = {
                code: 401,
                msg: '登录失败，验证码错误!'
                }
                return;
            }
            
            // 判断 userId 是否重复
            let res = await User.find({userId});
            console.log(res)
            if(res.length != 0){
                ctx.body = {
                code: 409,
                msg: '注册失败，登录账号重复了，换一个吧！'
                }
                return;
            }

            pwd = sha1(sha1(pwd + DM_ENCODE_STR));
            // 防止xss攻击， 转义
            name = xss(name);
            let token = create_token(userId);
            let user = new User({userId,name,pwd,avatar,token});
            res = await user.save();
            if(res._id != null){
                ctx.body = {
                  code: 200,
                  msg: "注册成功!",
                  data: {
                    _id: res._id,
                    name,
                    avatar,
                    token,
                  }
                }
              }else{
                ctx.body = {
                  code: 501,
                  msg: "注册失败，服务器异常!"
                }
              }
        } catch(e){
            console.log(e)

            ctx.body = {
                code: 500,
                msg: "注册失败，服务器异常!1"
            }
        }
       
    }
}