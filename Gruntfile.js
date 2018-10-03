/* eslint-env node */

// Generated on 2015-05-08 using generator-chrome-extension 0.3.1
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
    app: 'app',
    dist: 'dist',
    promo: 'promo',
    test: 'test',
  };

  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: [
          '<%= config.app %>/scripts/{,*/}*.js',
          '<%= config.test %>/{,*/}*.js'
        ],
        tasks: ['lint'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      styles: {
        files: ['<%= config.app %>/styles/{,*/}*.css'],
        tasks: [],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= config.app %>/*.html',
          '<%= config.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= config.app %>/manifest.json',
          '<%= config.app %>/_locales/{,*/}*.json'
        ]
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
            '<%= config.app %>'
          ]
        }
      },
    },

    // Empties folders to start fresh
    clean: {
      chrome: {
      },
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    eslint: {
      options: {
        ignorePattern: [
          '<%= config.app %>/scripts/chromereload.js'
        ]
      },
      target: [
        'Gruntfile.js',
        '<%= config.app %>/scripts',
        '<%= config.test %>/{,*/}*.js'
      ]
    },

    mochaTest: {
      test: {
        src: ['<%= config.test %>/**/*.js']
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
        '<%= config.app %>/popup.html',
        '<%= config.app %>/options.html'
      ]
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images']
      },
      html: ['<%= config.dist %>/{,*/}*.html'],
      //  css: ['<%= config.dist %>/styles/{,*/}*.css']
    },

    // The following *-min tasks produce minifies files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    mkdir: {
      images: {
        options: {
          create: ['<%= config.dist %>/images']
        }
      },
      promo: {
        options: {
          create: ['<%= config.promo %>/chrome', '<%= config.promo %>/firefox']
        }
      }
    },

    'imagemagick-convert': {
      icon19: {
        args: [
          '-density',
          '2000',
          '-background',
          'none',
          '-resize',
          '19x19',
          '-verbose',
          '<%= config.app %>/images/icon.svg',
          '<%= config.dist %>/images/icon-19.png'
        ],
        fatals: true
      },
      icon38: {
        args: [
          '-density',
          '2000',
          '-background',
          'none',
          '-resize',
          '38x38',
          '-verbose',
          '<%= config.app %>/images/icon.svg',
          '<%= config.dist %>/images/icon-38.png'
        ],
        fatals: true
      },
      icon48: {
        args: [
          '-density',
          '2000',
          '-background',
          'none',
          '-resize',
          '48x48',
          '-verbose',
          '<%= config.app %>/images/icon.svg',
          '<%= config.dist %>/images/icon-48.png'
        ],
        fatals: true
      },
      icon64: {
        args: [
          '-density',
          '2000',
          '-background',
          'none',
          '-resize',
          '64x64',
          '-verbose',
          '<%= config.app %>/images/icon.svg',
          '<%= config.promo %>/firefox/icon-64.png'
        ],
        fatals: true
      },
      icon128: {
        args: [
          '-density',
          '2000',
          '-background',
          'none',
          '-resize',
          '128x128',
          '-verbose',
          '<%= config.app %>/images/icon.svg',
          '<%= config.dist %>/images/icon-128.png'
        ],
        fatals: true
      },
      promoTileSmall: {
        args: [
          '-density',
          '2000',
          '-background',
          'white',
          '-resize',
          '420x280',
          '-verbose',
          '<%= config.app %>/images/promo_tile.svg',
          '<%= config.promo %>/chrome/promo_tile_small.png'
        ],
        fatals: true
      },
      promoTileLarge: {
        args: [
          '-density',
          '2000',
          '-background',
          'white',
          '-resize',
          '920x680',
          '-verbose',
          '<%= config.app %>/images/promo_tile.svg',
          '<%= config.promo %>/chrome/promo_tile_large.png'
        ],
        fatals: true
      },
      promoTileMarquee: {
        args: [
          '-density',
          '2000',
          '-background',
          'white',
          '-resize',
          '1400x890',
          '-verbose',
          '<%= config.app %>/images/promo_tile.svg',
          '<%= config.promo %>/chrome/promo_tile_marquee.png'
        ],
        fatals: true
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
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: '*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care of
    // minification. These next options are pre-configured if you do not wish
    // to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },

    uglify: {
      options: {
        beautify: true,
        compress: false,
        enclose: {},
        mangle: false
      },
      dist: {
        files: {
          '<%= config.dist %>/scripts/scripts.js': [
            '<%= config.dist %>/scripts/scripts.js'
          ]
        }
      }
    },

    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
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
        }]
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
      ],
      icons: [
        'imagemagick-convert:icon19',
        'imagemagick-convert:icon38',
        'imagemagick-convert:icon48',
        'imagemagick-convert:icon128'
      ],
      promo: [
        'imagemagick-convert:promoTileSmall',
        'imagemagick-convert:promoTileLarge',
        'imagemagick-convert:promoTileMarquee',
        'imagemagick-convert:icon64',
      ]
    },

    // Don't auto buildnumber, exclude debug files. smart builds that event pages
    chromeManifest: {
      dist: {
        options: {
          buildnumber: false,
          indentSize: 2,
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
          archive: function() {
            var manifest = grunt.file.readJSON('app/manifest.json');
            return 'package/Tab-less-' + manifest.version + '.zip';
          }
        },
        files: [{
          expand: true,
          cwd: 'dist/',
          src: ['**'],
          dest: ''
        }]
      }
    }
  });

  grunt.registerTask('debug', function () {
    grunt.task.run([
      'lint',
      'mkdir:images',
      'concurrent:icons',
      //  'concurrent:chrome',
      'connect:chrome',
      'watch'
    ]);
  });

  grunt.registerTask('lint', [
    'eslint'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'chromeManifest:dist',
    'useminPrepare',
    'mkdir:images',
    'concurrent:icons',
    'imagemin',
    //  'concurrent:dist',
    //  'cssmin',
    'concat',
    'uglify',
    'copy',
    'usemin',
    'compress'
  ]);

  grunt.registerTask('promo', [
    'mkdir:promo',
    'concurrent:promo',
  ]);

  grunt.registerTask('default', [
    'lint',
    'test',
    'build'
  ]);
};
