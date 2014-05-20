// Generated on 2014-05-15 using generator-chrome-extension 0.2.7
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths
  var config = {
    tmp : '.tmp',
    app: 'app',
    dist: 'dist',
    manifest: grunt.file.readJSON('app/manifest.json')
  };

  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['bowerInstall']
      },
      js: {
        files: ['<%= config.app %>/scripts/{,*/}*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.scss'],
        tasks: ['sass:serve'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.tmp %>/*.html',
          '<%= config.tmp %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.tmp %>/manifest.json',
          '<%= config.tmp %>/_locales/{,*/}*.json'
        ]
      },
      serve: {
        files: [
          '<%= config.app %>/{,*/}*.html',
          '<%= config.app %>/scripts/*.js'
        ],
        tasks: ['copy:serve']
      }
    },

    // Grunt server and debug server setting
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      },
      chrome: {
        options: {
          open: false,
          base: [
            '<%= config.tmp %>'
          ]
        }
      },
      test: {
        options: {
          open: false,
          base: [
            'test',
            '<%= config.app %>'
          ]
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      chrome: {
      },
      dist: {
        files: [
          {
            dot: true,
            src: [
              '<%= config.dist %>/*',
              '!<%= config.dist %>/.git*'
            ]
          }
        ]
      },
      tmp : {
        files: [
          {src:['<%= config.tmp %>/*']}
        ]
      }

    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },
    jasmine: {
      options: {
        specs: 'test/spec/**/*.js',
        vendor: [
          'app/bower_components/jquery/dist/jquery.js',
          'app/bower_components/jquery-ui/ui/jquery-ui.js'
        ]
      },
      test: {
        src: ['app/scripts/**/*.js']
      }
    },

    // Automatically inject Bower components into the HTML file
    bowerInstall: {
      app: {
        src: [
          '<%= config.app %>/*.html'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: [
        '<%= config.app %>/options.html'
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minifies files in the dist folder
    imagemin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    svgmin: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>/images',
            src: '{,*/}*.svg',
            dest: '<%= config.dist %>/images'
          }
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // removeCommentsFromCDATA: true,
          // collapseWhitespace: true,
          // collapseBooleanAttributes: true,
          // removeAttributeQuotes: true,
          // removeRedundantAttributes: true,
          // useShortDoctype: true,
          // removeEmptyAttributes: true,
          // removeOptionalTags: true
        },
        files: [
          {
            expand: true,
            cwd: '<%= config.app %>',
            src: '*.html',
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //     dist: {
    //         files: {
    //             '<%= config.dist %>/styles/main.css': [
    //                 '<%= config.app %>/styles/{,*/}*.css'
    //             ]
    //         }
    //     }
    // },
    // uglify: {
    //     dist: {
    //         files: {
    //             '<%= config.dist %>/scripts/scripts.js': [
    //                 '<%= config.dist %>/scripts/scripts.js'
    //             ]
    //         }
    //     }
    // },
    // concat: {
    //     dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      serve: {
        files : [
          {
            expand: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.tmp %>',
            src: [
              '*.{ico,png,txt}',
              'images/{,*/}*.{webp,gif,png}',
              '{,*/}*.html',
              'styles/{,*/}*.css',
              'styles/images/{,*/}*.{webp,gif,png}',
              'styles/fonts/{,*/}*.*',
              '_locales/{,*/}*.json',
              'scripts/{,*/}*.js',
              'bower_components/jquery/dist/jquery.js',
              'bower_components/jquery-ui/ui/jquery-ui.js',
              'manifest.json'
            ]
          }
        ]
      },
      dist: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: '<%= config.app %>',
            dest: '<%= config.dist %>',
            src: [
              '*.{ico,png,txt}',
              'images/{,*/}*.{webp,gif}',
              '{,*/}*.html',
              'styles/{,*/}*.css',
              'styles/fonts/{,*/}*.*',
              '_locales/{,*/}*.json',
            ]
          }
        ]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      chrome: [
      ],
      dist: [
        'imagemin',
        'svgmin'
      ],
      test: [
      ]
    },

    // Auto buildnumber, exclude debug files. smart builds that event pages
    chromeManifest: {
      dist: {
        options: {
          buildnumber: true,
          background: {
            target: 'scripts/background.js',
            exclude: [
              'scripts/chromereload.js'
            ]
          }
        },
        src: '<%= config.app %>',
        dest: '<%= config.dist %>'
      }
    },

    // Compres dist files to package
    compress: {
      dist: {
        options: {
          archive: 'package/Sticky Notes<%= config.manifest.version %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: ''
          }
        ]
      }
    },
    sass: {
      serve: {
        options: {
          sourceComments: 'normal',
          // Pickup generated files (eg. _sprite.scss)
          includePaths: ['']
        },
        files: {
          // Only does single files - no concatenating multiple files into a single file.
          '<%= config.tmp %>/styles/stickyNotes.css' : '<%= config.app %>/styles/stickyNotes.scss'
        }
      }
    }
  });

  grunt.registerTask('debug', function () {
    grunt.task.run([
      'jshint',
      'clean:tmp',
      'copy:serve',
      'sass:serve',
      'concurrent:chrome',
      'connect:chrome',
      'watch'
    ]);
  });

  grunt.registerTask('test', [
    'connect:test',
    'jasmine'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'chromeManifest:dist',
    'useminPrepare',
    'concurrent:dist',
    'cssmin',
    'concat',
    'uglify',
    'copy',
    'usemin',
    'compress'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
