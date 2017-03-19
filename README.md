# test-bot  
nodejs test service

**test-bot** fetches source code and runs `npm install` and `npm test`. The targeted repository and commit sha is specified in the request URL. The github credentials are configured on the server side, using [OAuth token](https://help.github.com/articles/git-automation-with-oauth-tokens/) authorization for accessing private repos. 


* **config.json** (put in same directory as this README.md)  
```
{
	"token": "21e22f14292c0577acd51a697d97fac29da153a3", //personal access token
	"owner": "joey", //github user name
	"port": "80" //port number for the service, defaults to 3000
}
```

* **install** `npm install test-bot`  

* **[aws-lambda integration](./aws-lambda.js)**

* **[API](./API.md)**

* **test** `npm test` For testing the full suite a valid `config.json` needs to be placed inside the `test/` directory.

Please create pull requests for features and issues for bugs or questions. 

