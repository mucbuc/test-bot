# test-bot API

* **[Overview](./README.md)**

*  **URL**  
  `/:repoName/:branch|commit`

*  **method**    
	`GET`

*  **URL params**   
  *Required:*  
    - `repo=[string]`  
      example: repo='test-bot'   
    - `ref=[string]`  
      example: ref='refs/heads/dev'  
    - `commit=[string]`   
      example: commit='edc2316e1bebf03e2ecc294780923a54566464b1'  

*  **success response**  
    - code: 200 Success  
      content: `{"status":"success"}`  
    - code: 201 Failed (npm install or npm test failed)  
      content: `{"status":"failure", "error": <details>}` 

*  **error response**  
    - code: 404 Not Found (invalid repository name or commit sha, unauthorized)  
      content: `{"error": <details>}`  
    - code: 500 Internal Server Error   
      content: `{"error": <no clue??>}`  

* **sample call**  
  `curl -L http://who.com/expector/master`
