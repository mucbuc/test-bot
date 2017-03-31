# test-bot  
is a node module for running tests on node modules 

## What problem it solves

When changing code it is convenient to have a server run automation tests. It is less convenient to embark on a quest to comprehend one of the existing automation servers just to 
* `git` the source
* run `npm install`  
* run `npm test`  

**test-bot** has you covered 


## Usage
* install on the server  
`npm install test-bot -g`  
* create configuration json file
```
{
	"token": "21e22f14292c0577acd51a697d97fac29da153a3", //personal access token
	"owner": "joey", //github user name
	"port": "80" //port number for the service, defaults to 3000
}
```  
* run **test-bot**  
`test-bot config.json`

* run unit tests  
 After pushing commits you can have the server run the tests  
`curl -L http://myaddress.com/test-bot/refs/heads/master/42d26c814362872e9d13c393cf9ef76ceacd74ea`, or more conveniently, hookup a github integration service which invokes an aws lambda function. This function then calls the **test-bot** service. 


## test 
`npm test` For testing the full suite a valid `config.json` needs to be placed inside the `test/` directory.

## [API](./API.md)

## [aws-lambda integration example](https://gist.github.com/mucbuc/3fabfb103ef96cbf468d06e0b2e227b1)

Please create pull requests for features and issues for bugs or questions. 
