# Colormath 🎨

Colormath is a color conversion and color manipulation library written in typescript for Node.js, Deno and Browser.

## Supported Conversions

These are supported color conversions from A to B suported by the library.

> Only conversions which are used by people are added to the library and if you feel some of the unavailable color conversions are useful then you can create an issue or create a pr if you are able to add it yourself.

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