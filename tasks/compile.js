module.exports = function (grunt) {
  grunt.registerTask('compile', [
    'clean:build',
    'shell:compile',
  ]);
};
