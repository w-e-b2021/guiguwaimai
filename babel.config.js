module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ],
    [
      'component',
      {
        libraryName: 'mint-ui',
        style: true
      },
      'mint-ui'
    ]
  ]
}
