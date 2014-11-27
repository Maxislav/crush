module.exports = function (grunt) {

    // Задачи
    grunt.initConfig({
        // Склеиваем
        concat: {
            main: {
                src: [
                    'lib/jquery/jquery-1.11.1.min.js',
                    'lib/jquery/jquery.tinyscrollbar.js',
                    'lib/leaflet/leaflet.js',
                    'lib/lodash/lodash.compat.min.js'
                ],
                dest: 'build/scripts.js'
            }
        },
        uglify: {
            options: {
                  sourceMap: true
            },
            main: {
                files: {
                    // Результат задачи concat
                    'build/scripts.min.js': '<%= concat.main.dest %>'

                }
            }
        },

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2,
                     sourceMap: true,
                     sourceMapFilename: 'build/css.min.css.map',
                     sourceMapRootpath: '../'
                },
                files: {
                  //  "module/dtp/dtp.css": "module/dtp/dtp.less",
                    "build/css.css": [
                        "lib/leaflet/leaflet.css",
                       "css/main.less",
                        "module/basemarker/basemarker.less",
                        "css/tinyscrollbar.less",
                        "module/addpoint/addpoint.less",
                        "items/alert.less",
                        "module/region/region.less"
                    ]
                }
            }
        },

        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: [
                    "css/main.less",
                    "module/basemarker/basemarker.less",
                    "css/tinyscrollbar.less",
                    "module/addpoint/addpoint.less",
                    "items/alert.less",
                    "module/region/region.less"
                ],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        }

    });

    // Загрузка плагинов, установленных с помощью npm install
    grunt.loadNpmTasks('grunt-contrib-concat');//
    grunt.loadNpmTasks('grunt-contrib-uglify');//
    grunt.loadNpmTasks('grunt-contrib-less');//
    grunt.loadNpmTasks('grunt-contrib-watch');//

    // Задача по умолчанию
    grunt.registerTask('default', ['concat', 'uglify','less','watch' ]);

};