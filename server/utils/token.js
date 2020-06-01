/**
 * @description: token
 * @author: Dm
 * @date: 2020-05-28
* */

const jwt = require('jsonwebtoken');
const {TOKEN_ENCODE_STR, URL_YES_PASS} = require('./keys');

module.exports = {
    // 生成登录 token
    create_token(str){
        return jwt.sign({str},TOKEN_ENCODE_STR, {expiresIn: '1h'});
    },
}