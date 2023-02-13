// deprecated file , no more use

const http = require('http');
const fs = require('fs');
const _ = require('lodash'); // just to test an npm package

//creates server using http module
const server = http.createServer((req,res)=>{


        res.setHeader('Content-Type','text/html');

        fs.readFile('./login/login.html',(err,data)=>{
            if(err){
                console.log(err);
                res.end();
            }else{
                res.write(data);
                res.end();
            }
        })

}); // param : mandatory callback/func with request and response

server.listen(3000, 'localhost', ()=>{
    console.log('listening to request on 3000')
}) // parameters : port no, host type (default is localhost), optional callback 