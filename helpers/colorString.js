const COLOR_CODES = new Map([
  ['white', [37, 89]],
  ['blue', [34, 89]],
  ['yellow', [33, 89]],
  ['red', [31, 89]],
  ['cyan', [36, 89]],
  ['green', [32, 89]],
  ['magenta', [35, 89]],
  ['gray', [30, 89]],
]);

function colorString(colorName, string) {
  const colorCodes = COLOR_CODES.has(colorName.toLowerCase()) ? COLOR_CODES.get(colorName.toLowerCase()) : COLOR_CODES.get('white');
  const [textColorStart, textColorEnd] = colorCodes;

  return `\x1b[${textColorStart}m${string}\x1b[${textColorEnd}m\x1b[0m`;
}

const colorSuccessMessage = colorString.bind(null, 'green');
const colorErrorMessage = colorString.bind(null, 'red');
const colorActionMessage = colorString.bind(null, 'blue');

exports.default = colorString;
module.exports.colorSuccessMessage = colorSuccessMessage;
module.exports.colorErrorMessage = colorErrorMessage;
module.exports.colorActionMessage = colorActionMessage;
