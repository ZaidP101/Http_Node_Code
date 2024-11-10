const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer((req,res) =>{
    res.setHeader('Content-Type', 'text/plain');

    if(req.method === 'GET'){
        const parseURl = url.parse(req.url,true);
        const pathname = parseURl.pathname;
        const query = parseURl.query;

        switch(pathname){
            case '/':
                fs.readFile('web.html', (err,data) =>{
                    if(err){
                        res.statusCode = 500;
                        res.end("Error loading page");
                    }
                    else{
                        res.end(data);
                    }
                });
                break;
            case '/Factorial':
                const numFact = parseInt(query.n);
                const factResult = factorial(numFact);
                res.end(`Factorial of ${numFact} is ${factResult}`);
                break;
            case '/prime':
                const numprime = parseInt(query.n);
                const primeResult = isprime(numprime);
                res.end(`The statement that the number ${numFact} is prime is : ${factResult}`);
                break;
            case '/Fabonachi':
                const numfab = parseInt(query.n);
                const fabResult = fabonachi(numfab).join(', ');
                res.end(`Fabonachi Series for ${numfab} is : ${fabResult}`);
                break;
            case '/calculator':
                const n1 = parseInt(query.n1);
                const n2 = parseInt(query.n2);
                const operator = query.operator;
                const calcuResult = calculator(n1,n2,operator);
                res.end(`Result of ${n1} ${operator} ${n2} is ${calcuResult}`);
                break;
            default:
                res.statusCode = 404;
                res.end('Page not found');
                break;
        }
    }


    function factorial(n){
        if(n===0) return 1;
        let result = 1;
        for(let i=1;i<=n; i++){
            result *= i;
        }
        return result;
    }

    function isprime(n){
        if(n<=2) return false;
        for(let i=n/2; i>1; i--){
            if(n%i===0){
                return false;
            }
        }
        return true;
    }

function fabonachi(n){
    let fabonachi = [0,1];
    for(let i=2; i<n; i++){
        fabonachi.push(fabonachi[i-1] + fabonachi[i-2]);
    }
    return fabonachi;
}

function calculator(num1,num2,operator){
    let result;
    switch(operator){
        case '+':
            result = num1+num2;
            break;
        case '-':
            result = num1-num2;
            break;
        case '*':
            result = num1*num2;
            break;
        case '/':
            result = num1/num2;
            break;
        default:
            result = 'Enter valid Number';
    }
    return result;
}
});


server.listen(3000,() =>{
    console.log("Server started and running on : http://localhost:3000");
});