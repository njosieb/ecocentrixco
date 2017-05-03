'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget, dirs.scripts.replace(/^_/, ''));

  gulp.task('templates', function() {
    return gulp.src(path.join(dirs.source, dirs.scripts, '/**/*.html'))
      .pipe(plugins.angularTemplatecache('templates.js', {
        module: 'vf-app'
      }))
      .pipe(plugins.changed(dest))
      .pipe(gulp.dest(dest))
      .on('end', browserSync.reload);
  })
}
