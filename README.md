This is a MEAN stack project using Yeoman and the angular-fullstack generator for scaffolding.

Currently has migrated code from master branch on https://bitbucket.org/schan93nxho/go.

If for any reason you have a server/config/local.env.js you want to use, uncomment out the line **"all: require(./server/config/local.env)" in Gruntfile.js**. The purpose of commenting this out was to keep this specified file in .gitignore as was commonly suggested.

**Useful commands**

For npm install errors: "npm cache clean", "bower cache clean"

For deleting node_modules folder on Windows (*Do this in command prompt): "mkdir junk" and then "robocopy junk node_modules /MIR"
