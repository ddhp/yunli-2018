/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/**
 * define the most common webpack configs
 * shared between browser/server
 *
 */
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

function baseConfig(platform = 'browser', env) {
  // if env is 'hot'
  // disable some eslint rules
  let eslintLoaderExtraRules = {};
  if (env === 'hot') {
    eslintLoaderExtraRules = {
      'no-console': 'off',
      'no-debugger': 'off',
      'react/prefer-stateless-function': 'off',
    };
  }

  const config = {
    context: path.resolve(__dirname),

    plugins: [],

    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'eslint-loader',
              options: {
                rules: eslintLoaderExtraRules,
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: env !== 'hot' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env !== 'hot' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
              limit: 8192, // 8kB
            },
          }],
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              name: env !== 'hot' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env !== 'hot' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
              limit: 8192, // 8kB
            },
          }],
        },
        {
          // ico is lower than limit of url-loader, so we explictly use file-loader
          test: /.ico$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: env !== 'hot' ? '[name]-[hash].[ext]' : '[name].[ext]',
              outputPath: env !== 'hot' ? '../assets/' : './', // no tailing with '/' to avoid hot reload issue
            },
          }],
        },
      ],
    },
  };

  // server config with css-loader/locals
  // https://github.com/webpack-contrib/mini-css-extract-plugin/issues/48#issuecomment-375288454
  if (platform === 'server') {
    config.module.rules.push(
      {
        test: /\.css$/,
        use: [
          'css-loader/locals',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'css-loader/locals',
        ],
      },
    );
  } else {
    const cssUseLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'prod',
        },
      },
    ];
    const scssUseLoaders = [
      {
        loader: 'css-loader',
        options: {
          sourceMap: env !== 'prod',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: env !== 'prod',
          plugins: [
            autoprefixer(),
          ],
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: env !== 'prod',
        },
      },
    ];

    if (env === 'prod') {
      // only use minicssextractplugin in prod build
      cssUseLoaders.unshift(MiniCssExtractPlugin.loader);
      scssUseLoaders.unshift(MiniCssExtractPlugin.loader);
      config.plugins.push(new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: '[name].[contenthash].css',
      }));
      // needs to manually minify when css is extracted
      // https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
      config.optimization.minimizer = [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ];
    } else {
      cssUseLoaders.unshift('style-loader');
      scssUseLoaders.unshift('style-loader');
    }
    config.module.rules.push(
      {
        test: /\.css$/,
        use: cssUseLoaders,
      },
      {
        test: /\.scss$/,
        use: scssUseLoaders,
      },
    );
  }

  return config;
}

export function findTargetRule(rules, targetTest) {
  let targetRule = {};
  rules.map((r) => {
    if (r.test.toString() === targetTest.toString()) {
      targetRule = r;
    }
    return false;
  });
  return targetRule;
}

export default baseConfig;
