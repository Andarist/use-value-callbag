module.exports = {
  presets: [
    [
      '@babel/env',
      {
        loose: true,
        modules: false,
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    process.env.NODE_ENV === 'test' && '@babel/transform-modules-commonjs',
  ].filter(Boolean),
}
