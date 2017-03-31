# test-bot  
is a node module for running tests on node modules 

## What problem it solves

When changing code it is convenient to have a server run automation tests, but less convenient to embark on a quest to comprehend one of the existing automation servers just to 
* checkout the source
* run npm install  
* run npm test  

**test-bot** has you covered 

## install  
`npm install test-bot -g` 

## Usage 
The targeted repository and commit sha is specified a http get request. github credentials are configured on the server side, using [OAuth token](https://help.github.com/articles/git-automation-with-oauth-tokens/) authorization for accessing private repos. 

* **run** `test-bot config.json`  

* **config.json**  
```
{
	"token": "21e22f14292c0577acd51a697d97fac29da153a3", //personal access token
	"owner": "joey", //github user name
	"port": "80" //port number for the service, defaults to 3000
}
```

* **test** `npm test` For testing the full suite a valid `config.json` needs to be placed inside the `test/` directory.

## [API](./API.md)

## [aws-lambda integration example](https://gist.github.com/mucbuc/3fabfb103ef96cbf468d06e0b2e227b1)

Please create pull requests for features and issues for bugs or questions. 
