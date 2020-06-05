
/**
 * @description: 评论模块
 * @author: Dm
 * @date: 2020-06-01
* */
const xss = require("xss");
const Comment = require('../db').Comment

module.exports = {
     // 添加留言
    async addComment(ctx,next){
        let {content='',_id} = ctx.request.body;
        let content1 = content
        if(content=""){
            ctx.body = {
                code: 401,
                msg: "留言失败，请写点什么吧!"
              }
              return;
        }
        if(content.length >= 150){
            ctx.body = {
                code: 401,
                msg: "你说的太多了，最多只能输入150个字符哦。"
            }
            return;
        }

    // 转义，防止xss攻击
        content1 = xss(content1);
        try {
            let comment = new Comment({
              userId: _id,
              content:content1
            });
            let res = await comment.save();
            if(_id != null){
              ctx.body = {
                code: 200,
                msg: '留言成功！',
                data: res
              }
            }else{
              ctx.body = {
                code: 500,
                msg: '留言失败，服务器异常，请稍后再试!'
              }
            }
          } catch (e){
            console.log(e);
            ctx.body = {
              code: 500,
              msg: '留言失败，服务器异常，请稍后再试!'
            }
          }
    },
    /* 
    @name: 获取留言
    @param: size => 返回最大个数 默认：10
    @param: page => 当前页数 默认：1
    */  
    async getComment(ctx,next){
      let {size = 10, page = 1} = ctx.query;
      // console.log(1111,ctx.query)
      let options = {
        skip: Number((page-1)*size),
        limit: Number(size),
        sort:{"create_time":"-1"},
      }
      let res = await Comment.find({},null,options);
      let total = await Comment.countDocuments();
      
      try{
        ctx.body = {
          code: 200,
          data:{
            list: res,
            page: {
              total,
              page : Number(page),
              size : Number(size)
            }
          },
          msg: '获取留言成功'
        }
      }
      catch(e){
        console.log(e);
        ctx.body = {
          code: 500,
          msg: '获取留言失败，服务器异常，请稍后再试!'
        }
      }
    },
     // 删除留言
     async delComment(ctx,next){

    }
}