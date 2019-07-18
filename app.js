const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'/public/dist/public')));


require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./client/dist/index.html"))
  });

app.listen(8000,()=>{
    console.log("listening at 8000");
})