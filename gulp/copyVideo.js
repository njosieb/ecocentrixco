'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget, dirs.videos.replace(/^_/, ''));

  // Copy
  gulp.task('copyVideo', () => {
    return gulp.src([
      path.join(dirs.source, dirs.videos, '**/*'),
    ])
    .pipe(plugins.changed(dest))
    .pipe(gulp.dest(dest));
  });
}
