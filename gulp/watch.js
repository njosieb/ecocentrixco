'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;

  // Watch task
  gulp.task('watch', () => {
    if (!args.production) {
      gulp.watch([
        path.join(dirs.source, dirs.styles, '**/*.less'),
        path.join(dirs.source, dirs.modules, '**/*.less'),
      ], ['less']);

      // Nunjucks Templates
      gulp.watch([
        path.join(dirs.source, '**/*.+(njk|html|nunjucks)'),
        path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}'),
        '!' + path.join(dirs.source, dirs.scripts, '**/*.html')
      ], ['nunjucks']);

      // Angular Templates
      gulp.watch([
        path.join(dirs.source, dirs.scripts, '**/*.html')
      ], ['templates']);

      // Copy
      gulp.watch([
        path.join(dirs.source, '**/*'),
        '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
        '!' + path.join(dirs.source, '**/*.nunjucks')
      ], ['copy']);

      // Images
      gulp.watch([
        path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
      ], ['imagemin']);

      // All other files
      gulp.watch([
        path.join(dirs.temporary, '**/*'),
        '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
      ]).on('change', browserSync.reload);
    }
  });
}
