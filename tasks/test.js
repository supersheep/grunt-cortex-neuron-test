var node_fs = require("fs");
var node_path = require("path");
var multi_profile = require("multi-profile");

module.exports = function(grunt){
    var pkg = JSON.parse(node_fs.readFileSync("package.json"));

    var profile = multi_profile({
        path:"~/.cortex",
        schema:{
            service_port    : {
                value       : 9074,
                type        : 'number'
            }
        }
    }).init();

    grunt.loadNpmTasks("grunt-mocha");

    grunt.registerMultiTask('neuron-test', 'run cortex build tasks', function(){
        var mochaOptions = {
            reporter: 'Spec',
            run: false,
            ignoreLeaks: false,
            timeout:5000
        }

        grunt.config("mocha.all",[node_path.join('.cortex','built',pkg.name,pkg.version,"test","index.html")]);
        // grunt.config("mocha.all",["http://localhost:" + profile.get("service_port") + "/mod/" + [pkg.name,pkg.version,"test","index.html"].join("/")])
        for(var property in mochaOptions){
            property = "mocha.option." + property;
            grunt.config(property, mochaOptions[property]);   
        }
        grunt.task.run('mocha');
    });
}
