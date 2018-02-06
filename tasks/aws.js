module.exports = function (grunt) {
  var credentials = grunt.file.readJSON('credentials.json');

  grunt.config.set('aws', credentials);

  grunt.config.set('s3', {
    options: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      bucket: credentials.s3.bucket
    },

    datas: {
      cwd: '.build',
      src: '**/*.json'
    }
  });

  grunt.config.set('cloudfront', {
    options: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      distributionId: credentials.cloudfront.id
    },
    html: {
      options: {
        invalidations: '**/*.json'
      }
    }
  });

  grunt.loadNpmTasks('grunt-aws');
};
