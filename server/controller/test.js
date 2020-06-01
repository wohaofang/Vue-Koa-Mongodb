
module.exports = {
    async haha(ctx, next){
        ctx.body = {
          code: 200,
          msg: '获取验证码成功！',
          data:{
            title: 'koa2 json'
          }
        }
    }
}