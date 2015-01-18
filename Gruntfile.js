/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    express: {
      options: {
        port: process.env.PORT || 4000,
        livereload: true
      },
      dev: {
        options: {
          script: 'server/app.js'
        }
      },
      prod: {
        options: {
          script: 'dist/server/app.js'
        }
      }
    },

    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          'public/**/*.js',
          'public/**/*.html'
        ],
        options: {
          livereload: true
        }
      },

      express: {
        files: [
          'server/**/*.{js,json}'
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
        path: 'http://localhost:<%=express.options.port%>'
      }
    }
  });

  // These plugins provide necessary tasks.
  /*
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  */
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('wait', function () {
    grunt.log.ok('Waiting for server reload...');

    var done = this.async();

    setTimeout(function () {
      grunt.log.writeln('Done waiting!');
      done();
    }, 1500);
  });

  grunt.registerTask('serve', [
    'express:dev',
    'wait',
    'open',
    'watch'
  ]);

  // Default task.
  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['watch']);


};
