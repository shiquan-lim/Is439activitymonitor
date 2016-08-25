# IS439 Activity Monitor App #

**Known Issue:** If you cannot get your app.bundle.js to compile, set `#!ionic-gulp-browserify-typescript": "1.1.0` in your package.json (follow exactly).

### Set Up ###

0) Install nodejs and npm

1) Get Ionic 2 Beta

`$ npm install -g ionic@beta`

2) Install node modules

`$ npm install`

3) Test on browser (should automatically open on compile)

`$ ionic serve`

Once its up, you can leave the terminal up for auto-updates whenever you save your work.

4)a (Optional) Test on mobile emulator.

`$ ionic emulate ios`
`$ ionic emulate android`

4)b If your platform does not work, try these commands (swap 'ios' with 'android' for Android phones).

`$ ionic platform remove ios`

`$ ionic platform add ios`

### File Structure ###
The file structure mostly follows Angular2. 

* All work and pages to be done in the '/app' folder (1 folder per screen roughly). 
* Images stored in '/www/img'. 
* Every .ts component is optionally accompanied by a .html for template and .scss for style.