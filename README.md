# CatzNDogz

### Dependencies
 * bootstrap
 * jquery
 * highcharts
 * express
 * request
 * body-parser
 * font-awesome

### Setup

  * From CatzNDogz *Separate* Docker Folder run:

    * `docker build -t catzndogzserver .`

    * `docker run -d --name CatzNDogz -p 5000:5000 catzndogzserver`

    * Test Connection:
`curl localhost:5000/health-check`  

* For FrontEnd


  * Make sure you have `node` and `nvm` installed

    * To test if installed for Windows and Mac Users

      * Test Node. In terminal type `node -v`.
      This should print a version number, so you’ll see something like this v8.10.0.
      * Test NPM. In terminal type type `npm -v`.
      This should print NPM’s version number so you’ll see something like this 5.6.0
      http://blog.teamtreehouse.com/install-node-js-npm-windows

  * Instructions for node
    * https://nodejs.org/en/download/

  * For ES6  Compiling
    * run `npm install -g babel-cli babel-preset-env babel-preset-stage-2 && echo "alias bnode='babel-node --presets es2015,stage-2'" >> ~/.bash_profile`
    `babel-preset-es2015`
    `babel-preset-stage-2`

* From this CatzNDogz Front in Folder
  * run `npm install`
  * run `node server`
  * view on port 8080


### Current Features
  * Zoom In on chart
  * Syncs with Characteristics in Table
