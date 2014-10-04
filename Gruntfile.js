module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-traceur');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');

    var sln = grunt.option('solution') || grunt.option('s');

    grunt.initConfig({
        traceur: {
            options: {
                modules: 'inline'
                // traceur options here
            },
            dist: {
                files: [{
                    expand: true,
                    src: ['main.js', 'src/**/*.js'],
                    dest: 'output'
                }]
            }
        },
        copy: {
            dist: {
                src: 'src/**.json',
                dest: 'output/'
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'main.js'],
                tasks: ['default'],
                options: {
                    spawn: false,
                }
            },
        },
        execute: {
            target: {
                src: ['output/main.js'],
                options: {
                    args: sln ? ['-s' + sln] : []
                }
            }
        }
    });

    grunt.registerTask('default', ['traceur', 'copy', 'execute']);
};
