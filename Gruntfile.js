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
        copy: {
            main: {
                files: [
                    {   expand: true, src: ['./bower_components/**'], dest: 'docs/' },
                    {   expand: true, src: ['./js/**'], dest: 'docs/' },
                    {   expand: true, src: ['./index.html'], dest: 'docs/' },
                    {   expand: true, src: ['./style/*.css', '!./style/*.styl'], dest: 'docs/' },
                    {   expand: true, src: ['./img/**'], dest: 'docs/' }
                ]
            }
        },
        watch: {
            bower: {
                files: ['bower_components/*'],
                tasks: ['wiredep']
            }
        }
    })
    grunt.registerTask('default', ['wiredep', 'watch']);
    grunt.registerTask('build', ['wiredep','copy']);
}
