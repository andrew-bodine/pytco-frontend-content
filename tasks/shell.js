module.exports = function (grunt) {
  grunt.config.set('shell', {
    compile: {
      command: 'node validate.js --exportJSON=true'
    }
  });

  grunt.loadNpmTasks('grunt-shell');
};
