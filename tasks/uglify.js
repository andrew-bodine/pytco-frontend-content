module.exports = function (grunt) {
  grunt.config.set('uglify', {
    build: {
      src: ['.build/parser.js'],
      dest: '.build/parser.min.js'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
};
