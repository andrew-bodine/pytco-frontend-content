module.exports = function (grunt) {
  grunt.config.set('browserify', {
    build: {
      src: [
          '**!(node_modules|tasks)/parser.js'
      ],
      dest: '.build/parser.js'
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
};
