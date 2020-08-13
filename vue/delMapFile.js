const path = require('path');
const fs = require('fs');

const distPath = path.join(__dirname,'./blog/js')
const readDir = fs.readdirSync(distPath);
const mapFile = readDir.filter(v => v.indexOf('.js.map') != -1)

console.log(mapFile)

function deleteFile(url,arr){
    let files = arr;
        
    files.forEach((v)=>{
        let curPath = path.join(url,v);
        fs.unlinkSync(curPath);
        console.log("删除文件："+curPath);
    })
}

deleteFile(distPath,mapFile)