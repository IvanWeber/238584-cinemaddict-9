const path = require(`path`);

module.exports = {
  mode: `development`, // Режим сборки
  entry: `./src/main.js`, // Точка входа приложения
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`, // Подключаем sourcemaps
  devServer: {
    contentBase: path.join(__dirname, `public`), // Где искать сборку
    publicPath: `http://localhost:8080/public/`, // Веб адрес сборки
    compress: true, // Сжатие
    watchContentBase: true // Обновление страницы при изменении в проекте
  }
};
