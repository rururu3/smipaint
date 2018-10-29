module.exports = {
  modules: [
    '@nuxtjs/pwa',
    'bootstrap-vue/nuxt',
  ],
  manifest: {
    name: 'すみぺいんとぴーだぶりゅーえー',
    lang: 'ja',
    // start_url: '/smipaint/'
  },
  router: {
    base: '/smipaint/'
  },
  // workbox: {
  //   dev: true, // 開発環境でもPWA
  //   swURL: '/smipaint/',
  // },
  css: [
    '@fortawesome/fontawesome-free-webfonts',
    '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css',
    '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css',
  ],  
  /*
  ** Headers of the page
  */
  head: {
    title: 'すみぺいんとぴーだぶりゅーえー',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: [
      'axios'
    ],
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

