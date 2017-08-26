'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);

  // Copy
  gulp.task('copy', () => {
    return gulp.src([
      path.join(dirs.source, '**/*'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
      '!' + path.join(dirs.source, '**/*.+(nunjucks|njk|html)')
    ])
    .pipe(plugins.changed(dest))
    .pipe(gulp.dest(dest));
  });

  gulp.task('copyDataFile', () => {
    return gulp.src([
      path.join(dirs.source, '_data/services.json'),
      path.join(dirs.source, '_scripts/markerclusterer.js')
    ])
    .pipe(plugins.changed(dest))
    .pipe(gulp.dest(path.join(dest, 'public')))
  })
}
