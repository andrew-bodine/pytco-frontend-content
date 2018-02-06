module.exports = function (grunt) {
  grunt.registerTask('build', [
    'clean:build',
    'browserify:build',
    'uglify:build'
  ]);
};
