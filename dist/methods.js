"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.darken = exports.lighten = exports.mixColor = exports.grayscale = exports.desaturate = exports.saturate = exports.complement = exports.hue = exports.invert = void 0;
const utils_1 = require("./utils");
const convert_1 = require("./convert");
function useHSV(color, fn) {
    let result = convert_1.rgb.toHsv(typeof color == "string" ? (0, utils_1.hexToRgb)(color) : color);
    fn(result);
    return new utils_1.ColorResult(convert_1.hsv.toRgb(result));
}
/**
 * Returns the inverted color of the provided color value.
 *
 * @param color The [r, g, b] array or hex string.
 */
function invert(color) {
    let [r, g, b] = (0, utils_1.RGB)(color);
    return new utils_1.ColorResult([255 - r, 255 - g, 255 - b]);
}
exports.invert = invert;
/**
 * Rotates the hue variable by provided degree.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The degree the hue variable to be rotated. Value ranges from 0 to 360. Default value is 30.
 */
function hue(color, value = 30) {
    if (value > 360)
        value %= 360;
    return useHSV(color, hsv => hsv[0] += value);
}
exports.hue = hue;
/**
 * Returns the complementary color of the provided color.
 *
 * @param color The [r, g, b] array or hex string.
 */
function complement(color) {
    return hue(color, 180);
}
exports.complement = complement;
/**
 * Saturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The saturation amount. Value ranges from 0.0 to 1.0. Default value is 0.5.
 */
function saturate(color, value = 0.5) {
    if (value > 1)
        value = 1;
    return useHSV(color, hsv => hsv[1] += (100 - hsv[1]) * value);
}
exports.saturate = saturate;
/**
 * Desaturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The desaturation amount. Value ranges from 0.0 to 1.0. Default value is 0.5.
 */
function desaturate(color, value = 0.5) {
    if (value > 1)
        value = 1;
    return useHSV(color, hsv => hsv[0] -= hsv[0] * value);
}
exports.desaturate = desaturate;
/**
 * Converts a color into grayscale.
 *
 * @param color The [r, g, b] array or hex string.
 */
function grayscale(color) {
    return desaturate(color, 0);
}
exports.grayscale = grayscale;
/**
 * Mixes two colors.
 *
 * @param colorA The rgb values of first color in the form of [r, g, b] array or hex string.
 * @param colorB The rgb values of second color in the form of [r, g, b] array or hex string.
 * @param amount The amount of the color to be mixed. Number should be between 0.0 to 1.0. Default value is 0.5.
 * @example
 * mixColor([189, 30, 30], [30, 30, 189]) // [109.5, 30, 109.5]
 * mixColor([189, 30, 30], [30, 30, 189], 0.75) // [149.25, 30, 69.75]
 * mixColor([189, 30, 30], [30, 30, 189], 1) // [189, 30, 30]
 *
 * mixColor('#e01616', '#6d1e6d').hex; // '#a71a42'
 * mixColor('#e01616', '#6d1e6d', 0.75).hex; // '#c3182c'
 * mixColor('#e01616', '#6d1e6d', 1).hex; // '#e01616'
 */
function mixColor(colorA, colorB, amount = .5) {
    let result = [0, 0, 0], rgbA = (0, utils_1.RGB)(colorA), rgbB = (0, utils_1.RGB)(colorB);
    for (let i = 0; i < 3; i++)
        result[i] = (rgbA[i] * amount) + (rgbB[i] * (1 - amount));
    return new utils_1.ColorResult(result);
}
exports.mixColor = mixColor;
/**
 * Lightens a color.
 *
 * @param color The rgb values in the form of [r, g, b] array or hex string.
 * @param amount The amount to lighten. The range should be from -100 to 100. Default value is 10. Negative values darken the color.
 * @example
 * lighten([218, 48, 85]) // [139.5, 177.5, 243.5]
 * lighten([218, 48, 85], 50) // [241.5, 255, 255]
 * lighten([218, 48, 85], -50) // [0, 24.5, 90.5]
 *
 * lighten('#7298da').hex; // '#a5cbff'
 * lighten('#7298da', 50).hex; // '#f2ffff'
 */
function lighten(color, amount = 10) {
    let result = (0, utils_1.RGB)(color);
    amount *= 2.55;
    for (let i = 0; i < 3; i++) {
        result[i] += amount;
        if (result[i] > 255)
            result[i] = 255;
        else if (result[i] < 0)
            result[i] = 0;
    }
    return new utils_1.ColorResult(result);
}
exports.lighten = lighten;
/**
 * Darkens a color.
 *
 * @param color The rgb values in the form of [r, g, b] array or hex string.
 * @param amount The amount to darken. The range should be from -100 to 100. Default value is 10. Negative values lighten the color.
 * @example
 * darken([218, 48, 85], 50) // [0, 24.5, 90.5]
 * darken([218, 48, 85], -50) // [241.5, 255, 255]
 *
 * lighten('#7298da').hex; // '#a5cbff'
 * lighten('#7298da', 50).hex; // '#f2ffff'
 */
function darken(color, amount = 20) {
    return lighten(color, -amount);
}
exports.darken = darken;
