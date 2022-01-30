# Colormath 🎨

Colormath is a color conversion and color manipulation library written in typescript for Node.js, Deno and Browser.

```js
const colors = require('colormath');

console.log(colors.rgb.toHex([255, 255, 255])); // '#ffffff'
console.log(colors.hex.toRgb('fff')); // [255, 255, 255]
```

## Installation

Using colormath through Node.js

```js
const colormath = require('colormath');
```

Using colormath through Browser

```html
<script src="https://cdn.skypack.dev/colormath@latest?min"></script>
```

Using colormath through Deno

```js
import * as colors from 'https://cdn.skypack.dev/colormath?dts';
```

## Examples

### Manipulation Methods

Hex and Rgb are only supported for manipulation methods.s

```js
console.log(colors.invert([114, 152, 218]).rgb); // [141, 103, 37]
console.log(colors.invert('#7298da'))            // #8d6725
```

### Conversion Methods

```js
// Converts rgb to hex
console.log(colors.rgb.toHex([255, 255, 255])); // '#ffffff'

// Converts hex to rgb
console.log(colors.hex.toRgb('fff'));           // [255, 255, 255]

// Converts hsl to rgb
console.log(colors.hsl.toRgb([218, 58, 65]));   // [114, 151.9, 217.5]
```

### Supported Conversions

These are supported color conversions from A to B suported by the library.

Only conversions which are used by people are added to the library and if you feel some of the unavailable color conversions are useful then you can create an issue or create a pr if you are able to add it yourself.

| ⬇ A \ B ➡  | rgb | hex | hsv | hsl | hwb | lab | lch | xyz | cmyk | ansi16 | ansi256 | gray |
|---------|-----|-----|-----|-----|-----|-----|-----|-----|------|--------|---------|------|
| rgb |  | ✔ | ✔ | ✔ | ✔ | ✔ | ❌ | ✔ | ✔ | ✔ | ✔ | ✔ |
| hex | ✔ |  | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| hsv | ✔ | ✔ |  | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| hsl | ✔ | ✔ | ✔ |  | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| hwb | ✔ | ✔ | ❌ | ❌ |  | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| lab | ✔ | ❌ | ❌ | ❌ | ❌ |  | ✔ | ✔ | ❌ | ❌ | ❌ | ❌ |
| lch | ❌ | ❌ | ❌ | ❌ | ❌ | ✔ |  | ❌ | ❌ | ❌ | ❌ | ❌ |
| xyz | ✔ | ❌ | ❌ | ❌ | ❌ | ✔ | ❌ |  | ❌ | ❌ | ❌ | ❌ |
| cmyk | ✔ | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |  | ❌ | ❌ | ❌ |
| ansi16 | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |  | ❌ | ❌ |
| ansi256 | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |  | ❌ |
| gray | ✔ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |  |

- ✔ means the color conversion is supported.
- ❌ means the color conversion is not supported.

### Sub conversions

You can still perform sub conversions. For example, conversions like rgb to lch does not exist you can still perform conversions like rgb to lab to lch.

```js
const colors = require('colormath');
const rgbToLch = (rgb) => colors.lab.toLch(colors.rgb.toLab(rgb));

console.log(rgbToLch([255, 255, 255])); 
// Output: [ 100.00000386666655, 0.00001795054880958058, 158.19859051364818 ]
```

## Things to be added

- Support for `alpha` and string conversions.
- Find a better way to do `ColorResult`.
- Extracting colors from images.
- More color manipulation methods.
- Support for color spaces other than hex and rgb for method functions.

## Help

If any doubts, bugs, reports regarding the module or want to add a new conversion or a new color model you can create an [issue](https://github.com/scientific-dev/colormath/issues) in github.