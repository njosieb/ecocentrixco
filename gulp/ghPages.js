'use strict'

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;

  gulp.task('ghPages', () => {
    return gulp.src(`${dirs.destination}/**/*`)
      .pipe(plugins.ghPages())
  })

}
