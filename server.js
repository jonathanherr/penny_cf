var express = require('express');
var openai = require('openai');
var app = express();
var https = require('https');
var TOKEN = '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';
app.use(express.static('public'));
app.use('/static', express.static('public'));
var bodyParser = require('body-parser')
var axios = require('axios');
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
    console.log("test");
    console.log(req.body.text);
    post_openai(req.body.text, res);
    
})

app.post('/generateimage', function(req, res){
    console.log("get images!")
    console.log(req.body.text);

    post_openai(req.body.text, res)

})
var server = app.listen(8000, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Penny server listening at http://%s:%s", host, port)
})