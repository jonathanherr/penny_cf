var express = require('express');
var openai = require('openai');
var app = express();
var https = require('https');
var TOKEN = 'TOKEN'
app.use(express.static('public'));
app.use('/static', express.static('public'));
var bodyParser = require('body-parser');
var axios = require('axios');
var fs = require('fs');
TOKEN=fs.readFileSync("./.token",{encoding:'utf8',flag:'r'})
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    
})

function post_openai(prompt, ores){
    axios.post('https://api.openai.com/v1/images/generations',
        {
            prompt:prompt,
            n:1,
            size:"512x512",
            response_format:"url",
        },
        {headers:{
            'Content-Type':"application/json",
            'Authorization': "Bearer "+TOKEN
        }}).then(function(oaires){
            ores.send(oaires.data.data[0]["url"]);
        });
}

app.get("/test",function(req,res){
    post_openai(req.body.text, res);
    
})

app.post('/generateimage', function(req, res){
    post_openai(req.body.text, res)

})
var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Penny server listening at http://%s:%s", host, port)
})
