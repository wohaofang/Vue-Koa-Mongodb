const mongoose = require('mongoose');

const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/test",{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', (success)=>{
    console.log('connected db: test')
    if(success){
        success()
    }
})
db.on('disconnected', function () {
    console.log('MongoDB disconnected!');
    mongoose.connect(config.mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});
db.on('connecting', function () {
    console.log('connecting to MongoDB...');
});
db.on('connected', function () {
    console.log('MongoDB connected!');
});
db.on('reconnected', function () {
    console.log('MongoDB reconnected!');
});


// 验证码
let checkcodeSchema = new mongoose.Schema({
    token: String,
    code: String
  })

// 用户
let userSchema = new mongoose.Schema({
    name: String,
    userId: String,
    pwd: String,
    avatar: {
      type: String,
      default: ""
    },
    token: {
      type: String,
      default: ""
    }
  })
  
// 留言
let commentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    content: String,
    create_time: {
      type: String,
      default: Date.now
    }
  })

exports.Checkcode = mongoose.model('Checkcode', checkcodeSchema);
exports.User = mongoose.model('User', userSchema); 
exports.Comment = mongoose.model('Comment', commentSchema); 
