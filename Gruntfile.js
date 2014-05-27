module.exports = function (grunt) {
    "use strict";

    var sourceFiles = grunt.file.expand("lib/**/*.js");
    var specFiles = grunt.file.expand("spec/**/*.js");
    var docsDir = "./docs";

    // capstone.js must be listed first or docs fail
    sourceFiles.sort(function (a, b) {
        return (
            a === "lib/capstone.js" ? -1 :
            b === "lib/capstone.js" ? 1 :
            a < b ? -1 :
            a > b ? 1 :
            0
        );
    });

    // Project configuration.
    grunt.initConfig({
        "pkg" : grunt.file.readJSON("package.json"),

        "jshint" : {
            "options" : {
                "jshintrc" : ".jshintrc",
            },

            "files" : {
                "src" : [ sourceFiles, specFiles, "Gruntfile.js" ],
            }
        },

        "clean" : {
            "docs" : {
                "src" : [ docsDir + "/**/*" ],
            }
        },

        "doxdot" : {
            "options" : {
                "views" : "views",
                "readme" : "README.md",
                "project" : "node-capstone",
                "links" : {
                    "blog" : "http://blog.kodewerx.org/",
                    "twitter" : "kodewerx",
                }
            },

            "src" : sourceFiles,
            "dest" : docsDir,
        },

        "jasmine_node" : {
            "all" : [ "spec/" ],
        },
    });

    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-jasmine-node");

    // Custom Tasks
    grunt.loadTasks("tasks");

    // Default task.
    grunt.registerTask("default", [ "test" ]);

    grunt.registerTask("test", [ "jshint", "jasmine_node" ]);
    grunt.registerTask("lint", [ "jshint" ]);
    grunt.registerTask("docs", [ "jshint", "clean:docs", "doxdot" ]);
};
