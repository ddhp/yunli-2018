module.exports = {
/**
 * Application configuration section
 * http://pm2.keymetrics.io/docs/usage/application-declaration/
 */
  apps: [
  // First application
    {
      name: 'YunLi 2018',
      script: './dist/server/index.js',
      env: {
        COMMON_VARIABLE: 'true',
        NODE_ENV: 'development',
        DEBUG: '*,-nodemon*,-express*,-send,-babel',
        PORT: '7373',
      },
      env_stage: {
        NODE_ENV: 'stage',
      },
      env_production: {
        NODE_ENV: 'production',
      },
      // "exec_interpreter" : "./node_modules/.bin/babel-node",
      out_file: 'logs/out.log',
      err_file: 'logs/err.log',
    },
  ],
};
