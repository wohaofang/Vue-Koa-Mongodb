const router = require('koa-router')()
const controller = require('../controller')

router.get('/', async (ctx, next) => {
   
    ctx.body =   
    `<html>
        <head></head>
        <body>
            <h1> hello world! Dm, is my test</h1>
        </body>
    </html>
    `; 
    
})

router.get("/api/test/haha", controller.test.haha) //测试

router.get("/api/other/checkcode", controller.other.checkcode) // 生成验证码

router.post("/api/user/login", controller.user.login) // 登录
router.post("/api/user/register", controller.user.register) // 注册


router.post("/api/comment", controller.comment.addComment) // 添加评论


module.exports = router