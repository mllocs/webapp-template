module.exports = function (grunt) {
  grunt.initConfig({
    autoprefixer: {
      application: {
        src: 'public/stylesheets/application.css'
      , dest: 'public/stylesheets/application.css'
      }
    }
  , sass: {
      dist: {
        files: {
          'public/stylesheets/application.css' : 'src/sass/application.scss'
        }
      }
    }
  , jade: {
      compile: {
        options: {
          data: {
            debug: false
          }
        }
      , files: {
          'public/index.html': ['src/templates/index.jade']
        }
      }
    }
  , copy: {
      js: {
        expand: true
      , cwd: 'src/javascript/'
      , src: '**/*.js'
      , dest: 'public/javascript/'
      }
    , images: {
        expand: true
      , cwd: 'src/images'
      , src: '*.png'
      , dest: 'public/images/'
      }
    , images_sprites: {
        expand: true
      , cwd: 'src/images/sprites'
      , src: '*.png'
      , dest: 'public/images/sprites'
      }
    }
  , watch: {
      options: {
        livereload: true
      }
    , js: {
        files: ['src/javascript/*.js']
      , tasks: ['copy:js']
      }
    , images: {
        files: ['src/images/*.png']
      , tasks: ['copy:images']
      }
    , images_sprites_icons: {
        files: ['src/images/sprites/icons/*.png']
      , tasks: ['sprite:icons', 'sass', 'copy:images_sprites']
      }
    , sass: {
        files: ['src/sass/*.scss']
      , tasks: ['sass', 'autoprefixer:application']
      }
    , jade: {
        files: ['src/templates/**/*.jade']
      , tasks: ['jade']
      }
    }
  , sprite: {
      icons: {
        src: 'src/images/sprites/icons/*.png'
      , destImg: 'src/images/sprites/icons.png'
      , destCSS: 'src/sass/sprites_icons.scss'
      , engine: 'gm'
      , cssFormat: 'css'
      , engineOpts: {
          imagemagick: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-spritesmith');

  grunt.registerTask('init', ['copy:js', 'copy:images', 'jade', 'sprite:icons', 'sass', 'copy:images_sprites']);
  grunt.registerTask('default', ['watch']);
};
