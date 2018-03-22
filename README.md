# CatzNDogz

###Dependencies


### Setup
  * From CatzNDogz Separate Docker Folder

    * `docker build -t catzndogzserver .`

    * `docker run -d --name CatzNDogz -p 5000:5000 catzndogzserver`

    * Test Connection:
`curl localhost:5000/health-check`  

* From this CatzNDogz Front in Folder
  * npm install
  * run node server
  * view on port 8080


### Current Features
  * Zoom In on chart
  * Syncs with Characteristics in Table
