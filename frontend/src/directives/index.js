export const focusDirective = {
  mounted: (el) => {
    el.focus()
  },
}

// export const rainbowDirective = {
//   mounted(el) {
//     el.onkeyup = () => {
//       const color = _getRandomColor()
//       el.style.backgroundColor = color
//       el.style.color = _isDarkColor(color) ? 'white' : 'black'
//     }
//   },
// }

// export const customOnDirective = {
//   mounted(el, binding) {
//     const type = binding.arg
//     const fn = binding.value
//     el.addEventListener(type, fn)
//   },
// }

// function _isDarkColor(c) {
//   c = c.substring(1) // strip #
//   const rgb = parseInt(c, 16) // convert rrggbb to decimal
//   const r = (rgb >> 16) & 0xff // extract red
//   const g = (rgb >> 8) & 0xff // extract green
//   const b = (rgb >> 0) & 0xff // extract blue
//   var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709

//   return luma < 100
// }

// function _getRandomColor() {
//   const letters = '0123456789ABCDEF'
//   let color = '#'
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)]
//   }
//   return color
// }
