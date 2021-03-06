/*global module:false*/
module.exports = function(grunt) {
  require('jit-grunt')(grunt, {
    express: 'grunt-express-server',
    useminPrepare: 'grunt-usemin',
    buildcontrol: 'grunt-build-control'
  });
  require('time-grunt')(grunt);


  // Project configuration.
  grunt.initConfig({
    // Project settings
    pkg: grunt.file.readJSON('package.json'),
    config: require('./server/config/local'),
    app: {
      public: 'public',
      server: 'server',
      dist: 'dist'
    },

    express: {
      options: {
        port: process.env.PORT || 4000,
        livereload: true
      },
      dev: {
        options: {
          script: '<%=app.server%>/app.js'
        }
      },
      prod: {
        options: {
          script: '<%=app.dist%>/server/app.js'
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%=app.public%>/**/*.css',
          '<%=app.public%>/**/*.js',
          '<%=app.public%>/**/*.html'
        ],
        options: {
          livereload: true
        }
      },

      express: {
        files: [
          '<%=app.server%>/**/*.{js,json}'
        ],
        tasks: ['express:dev', 'wait'],
        options: {
          livereload: true,
          nospawn: true //Without this option specified express won't be reloaded
        }
      }
    },

    open: {
      all: {
        path: 'http://<%=config.host%>:<%=express.options.port%>'
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish'),
        jshintrc: '.jshintrc'
      },
      public: {
        src: [
          '<%=app.public%>/js/**/*.js',
          '!<%=app.public%>/js/**/*.spec.js'
        ]
      },
      public_test: {
        src: [
          '<%=app.public%>/js/**/*.spec.js'
        ]
      },
      server: {
        src: [
          '<%=app.server%>/**/*.js'
        ]
      }
    },

    buildcontrol: {
      options: {
        dir: 'dist',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      heroku: {
        options: {
          remote: '<%=config.heroku.remote%>',
          branch: 'master'
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%=app.dist%>/*'
          ]
        }]
      },
      server: '.tmp'
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: '<%=app.public%>',
            src: [
              '*.{ico,png,txt}',
              'fonts/**/*',     // if you're using the fonts of Bootstrap or FontAwesome, copy the fonts to this fonts directory.
              'html/**/*',
              'img/**/*',
              'index.html'
            ],
            dest: '<%=app.dist%>/public'
          },
          {
            expand: true,
            src: ['server/**/*', 'package.json'],
            dest: '<%=app.dist%>'
          }

        ]
      }
    },

    injector: {
      bower_dependencies: {
        options: {
          bowerPrefix: 'bower:',
          relative: true,
          ignorePath: '<%=app.public%>/'
        },
        files: {
          '<%=app.public%>/index.html': [
            'bower.json'
          ]
        }
      },
      local_dependencies: {
        options: {
          relative: true,
          ignorePath: '<%=app.public%>/'
        },
        files: {
          '<%=app.public%>/index.html': [
            '<%=app.public%>/js/**/*.js',
            '<%=app.public%>/css/**/*.css',
            '!<%=app.public%>/js/**/*.spec.js',
          ]
        }
      }
    },

    useminPrepare: {
      html: ['<%=app.public%>/index.html'],
      options: {
        dest: '<%=app.dist%>/public'
      }
    },

    usemin: {
      html: ['<%=app.dist%>/public/**/*.html'],
      options: {
        dirs: [
          '<%=app.dist%>/public'
        ]
      }
    },

    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat',
          src: '*/**.js',
          dest: '.tmp/concat'
        }]
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    mochaTest: {
      options: {
        reporter: 'spec'
      },
      src: ['server/**/*.spec.js']
    }
  });



  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
    this.async();
  });

  grunt.registerTask('serve', function(target) {
    if (target === 'prod') {
      return grunt.task.run([
        'build',
        'express:prod',
        'wait',
        'open',
        'express-keepalive'
      ]);
    }

    return grunt.task.run([
      'injector',
      'express:dev',
      'wait',
      'open',
      'watch'
    ])
  });

  grunt.registerTask('test', function(target) {
    if (target === 'client') {
      return grunt.task.run([
        'karma'
      ]);
    } else if (target === 'server') {
      return grunt.task.run([
        'mochaTest'
      ]);
    } else {
      return grunt.task.run([
        'test:server',
        'test:client'
      ]);
    }
  });

  grunt.registerTask('build', [
    'clean:dist',
    'injector',
    'copy',
    'useminPrepare',
    'concat',
    'ngAnnotate',
    'uglify',
    'cssmin',
    'usemin'
  ]);

  grunt.registerTask('deploy', [
    'build',
    'buildcontrol:heroku'
  ]);

  // Default task.
  grunt.registerTask('default', [
    'jshint',
    'test',
    'build'
  ]);
};
