module.exports = function(grunt){
    require('load-grunt-tasks')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        wiredep: {
            task: {
                src: ['index.html']
            },
            options: {}
        },
        watch: {
            bower: {
                files: ['bower_components/*'],
                tasks: ['wiredep']
            }
        }
    })
    grunt.registerTask('default', ['wiredep', 'watch']);
    grunt.registerTask('build', ['wiredep']);
}
