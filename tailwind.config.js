/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}' // указываем путь к файлам, где будут использоваться классы Tailwind
  ],
  theme: {
    extend: {
      // Пример расширения темы, например добавление кастомных цветов
      colors: {
        primary: '#FF5733', // основной цвет
        secondary: '#33FF57' // дополнительный цвет
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        lora: ['Lora', 'sans-serif'],
        muller: ['Muller', 'sans-serif'],
        custom: ['"Open Sans"', 'sans-serif'] // пример кастомного шрифта
      },
      // Пример добавления кастомных размеров
      spacing: {
        72: '18rem', // Добавляем новый размер
        84: '21rem',
        96: '24rem'
      },
      borderRadius: {
        lg: '.2rem' // Свой размер скругления
      },
      // container: {
      //   padding: '2rem',
      // },
    }
  },
  plugins: []
}
