# angular-express-seed
This seed is an application skeleton for an AngularJS web app with Node + Express. 

This seed contains a bunch of JavaScript libraries including AngularJS libraries and popular development tools such as Bower, Grunt, Karma, Mocha, and Livereload.

This seed supports automatic injection of js and css files into index.html and minifies the js and css files.


## Getting Started

Clone a copy of the repository

```bash
$ git clone git://github.com/hidcliff/angular-express-seed.git
```

Enter the seed directory and install dependencies.
```bash
$ cd angular-express-seed
$ npm install
```

### Running the app

Run the app by `grunt serve` or `npm start` command.

```bash
$ grunt serve
```
or
```bash
$ npm start
```

### Running Tests

```bash
$ grunt test
```
or
```bash
$ npm test
```


### Build
```bash
$ grunt build
```

The `dist` subdirectory will be created and new production files will put in the subdirectory, along with minified copy of js and css files.



## Directory Structure

```
public/                           - All of the files on the client side
    css/                          - CSS files
        main.css
    html/                         - HTML files
        main.html
    js/                           - JavaScript files
        app.js                    - App module
        main.js                   - Routes 
        main.controller.js        - Controller for main
        main.controller.spec.js   - Test for Controller
    index.html                    - index html page
server/             
    config/                       - Server configuration
        index.js
    routes/                       - Server api
        data.js                   - Routes
        data.spec.js              - Test
    views/                        - Server views
        error.html       
    app.js                        - Express app configuration
    routes.js                     - Top level 
bower.json                        - bower package
Gruntfile.js                      - Gruntfile
package.json                      - npm package

```
