import webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: [
      '.tsx', '.ts', '.jsx', '.js'
    ]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
  // output:
};

// export default config;

export const compiler = webpack(config);

// compiler.run((err, stats) => {
//   console.log(err);
// });
