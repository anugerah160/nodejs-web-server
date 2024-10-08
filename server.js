const http = require('http');

const requestListener = (request, response) =>{
    response.setHeader('Content-Type', 'text/html');
    response.statusCode = 200;

    const { method, url } = request;
    
    if(url === '/'){
        if(method === 'GET') {
            response.end(`<h1>Ini di 'Home page'! </h1>`);
        }else{
            response.end(`<h1>NGUAWOR!!! gunakan request GET, jangan gunakan ${method} request! </h1>`);
        }
    }else if(url === '/about'){
        if(method === 'GET') {
            response.end(`<h1>Ini di 'Halaman About'! </h1>`);
        }else if(method === 'POST'){
            let body = [];
 
            request.on('data', (chunk) => {
              body.push(chunk);
            });
    
            request.on('end', () => {
              body = Buffer.concat(body).toString();
              const {name} = JSON.parse(body);
              response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        }
        else{
        response.end(`<h1>NGUAWOR!!! This page can't be accessed by ${method} Request</h1>`);
        }
    }else{
        response.end(`<h1>halaman tidak ditemukan</h1>`);
    }
    
    // if(method === 'GET') {
    //     response.end('<h1>hEllo!</h1>');
    // }
 
    // if(method === 'POST') {
    //     let body=[];
        
    //     request.on('data', (chunk) => {
    //         body.push(chunk);
    //     });

    //     request.on('end', ()=> {
    //         body = Buffer.concat(body).toString();
    //         const {name} = JSON.parse(body);
    //         response.end(`<h1>Hai, ${name}! </h1>`);
    //     });
    // }

    // if(method === 'PUT') {
    //     response.end('<h1>Bonjour!</h1>');
    // }

    // if(method === 'DELETE') {
    //     response.end('<h1>Salam!</h1>');
    // }

}

const server = http.createServer(requestListener);

const port = 5000;
const host = 'localhost';

server.listen(port, host, ()=> {
    console.log(`Server berjalan pada http://${host}:${port}`);
});