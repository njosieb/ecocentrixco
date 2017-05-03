'use strict';
const url = require('url')
const proxy = require('proxy-middleware')

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  // BrowserSync
  gulp.task('browserSync', () => {
    const proxyOptions = url.parse('http://localhost:3002');

    browserSync.init({
      open: args.open ? 'local' : false,
      online: true,
      startPath: config.baseUrl,
      port: config.port || 3000,
      server: {
        baseDir: taskTarget,
        middleware: [proxy(proxyOptions)],
        routes: (() => {
          let routes = {};

          // Map base URL to routes
          routes[config.baseUrl] = taskTarget;

          return routes;
        })()
      }
    });
  });
}
