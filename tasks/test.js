var node_fs = require("fs");
var node_path = require("path");
module.exports = function(grunt){
    var pkg = JSON.parse(node_fs.readFileSync("package.json"));

    // grunt.initConfig({
    //     mocha: {
    //         all: [node_path.join('.cortex','built',pkg.name,pkg.version,"test","index.html")],
            
    //     }
    // });

    grunt.loadNpmTasks("grunt-mocha");

    grunt.registerMultiTask('neuron-test', 'run cortex build tasks', function(){
        var mochaOptions = {
            reporter: 'Spec',
            run: false,
            ignoreLeaks: false,
            timeout:5000
        }

        grunt.config("mocha.all",[node_path.join('.cortex','built',pkg.name,pkg.version,"test","index.html")])
        for(var property in mochaOptions){
            property = "mocha.option." + property;
            grunt.config(property, mochaOptions[property]);   
        }
        grunt.task.run('mocha');
    });
}
