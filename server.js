const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.resolve(__dirname, './public')));
app.listen(5454);
console.log('服务启动成功，请访问http://localhost:5454');
