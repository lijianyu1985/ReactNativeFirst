//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT = 8075;

let users = [
            {
                'UserName':'Steve',
                'Age':32
            },
            {
                'UserName':'Jack',
                'Age':30
            }
        ];

// We need a function which handles requests and send response
function handleRequest(request, response) {
    if (request.url.indexOf('getlist') >= 0) {
        response.setHeader('Content-Type', 'application/json');
        response.write(JSON.stringify(users));
        response.end();
    }
    else if (request.url.indexOf('addUser') >= 0) {
        let body = '';
        // Get the data as utf8 strings.
        // If an encoding is not set, Buffer objects will be received.
        request.setEncoding('utf8');
        request.on('data', (chunk) => {
            body += chunk;
        });

        // the end event indicates that the entire body has been received
        request.on('end', () => {
            try {
                const data = JSON.parse(body);
                users.push(data);
                // write back something interesting to the user:
                response.setHeader('Content-Type', 'application/json');
                response.write(JSON.stringify(users));
                response.end();
            } catch (er) {
                // uh oh!  bad json!
                response.statusCode = 400;
                return response.end(`error: ${er.message}`);
            }
        });

    } else {
        response.end('Server working properly. Requested URL : ' + request.url);
    }


}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});