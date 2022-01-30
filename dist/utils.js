"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fixedFloat = exports.randomHex = exports.random = exports.rgbToHex = exports.hexToRgb = exports.padHex = exports.breakHex = exports.formatHex = exports.rawHex = exports.ColorResult = exports.RANDOM = exports.RGB = void 0;
/**
 * A lambda function to convert a ColorValue to rgb values.
 */
const RGB = (x) => typeof x == "string" ? hexToRgb(x) : x;
exports.RGB = RGB;
/**
 * A lambda function to generate random numbers.
 */
const RANDOM = m => Math.floor(Math.random() * m);
exports.RANDOM = RANDOM;
/**
 * A color result object returned by functions in "methods.ts".
 *
 * The main purpose of this function is to allow hex conversion for the rgb
 * array returned.
 */
class ColorResult {
    constructor(rgb) {
        this.rgb = rgb;
    }
    /**
     * Converts rgb values into hex string.
     */
    get hex() {
        return rgbToHex(this.rgb);
    }
    valueOf() {
        return this.hex;
    }
}
exports.ColorResult = ColorResult;
/**
 * Extracts the raw hex from the hex string.
 *
 * @param hex The hex
 * @example
 * rawHex('1dc'); // '11ddcc'
 * rawHex('#1dc'); // '11ddcc'
 * rawHex('#11ddcc'); // '11ddcc'
 */
function rawHex(hex) {
    if (hex[0] == '#')
        hex = hex.slice(1);
    if (hex.length >= 6)
        return hex.slice(0, 6);
    else if (hex.length == 3) {
        let fmt = "";
        for (let i = 0; i < hex.length; i++)
            fmt += `${hex[i]}${hex[i]}`;
        return fmt;
    }
    else
        return '000000';
}
exports.rawHex = rawHex;
/**
 * Formats the unformatted hex.
 *
 * @param hex The hex.
 * @example
 * formatHex('1dc'); // '#11ddcc'
 * formatHex('7298da'); // '#7298da'
 */
function formatHex(hex) {
    return `#${rawHex(hex)}`;
}
exports.formatHex = formatHex;
/**
 * Breaks down a raw hex into [r, g, b].
 *
 * @param hex The hex.
 * @example
 * breakHex('ffffff'); // [255, 255, 255]
 */
function breakHex(hex) {
    let x = parseInt(hex, 16);
    return [x >> 16, (x >> 8) & 0x00ff, x & 0x0000ff];
}
exports.breakHex = breakHex;
/**
 * Converts a rgb value to the component of hex.
 *
 * @param x The value
 * @example
 * padHex(255); // 'ff'
 * padHex(0); // '00'
 */
function padHex(x) {
    let c = Math.round(x).toString(16);
    return `${c.length == 1 ? '0' : ''}${c}`;
}
exports.padHex = padHex;
/**
 * Converts an unformatted hex string to [r, g, b].
 *
 * @param hex The Hex
 * @example
 * hexToRgb('fff'); // [255, 255, 255]
 * hexToRgb('#000000'); // [0, 0, 0]
 * hexToRgb('#ffffff7f'); // [255, 255, 255, 0.5]
 */
function hexToRgb(hex) {
    return breakHex(rawHex(hex));
}
exports.hexToRgb = hexToRgb;
/**
 * Converts a rgb array to a formatted hex.
 *
 * @param param0 The [r, g, b, a] array.
 * @example
 * rgbToHex([255, 255, 255]); // '#ffffff'
 * rgbToHex([0, 0, 0]); // '#000000'
 * rgbToHex([255, 255, 255, 0.5]) // '#ffffff7f'
 */
function rgbToHex([r, g, b, a]) {
    return `#${padHex(r)}${padHex(g)}${padHex(b)}${a ? padHex(a * 255) : ''}`;
}
exports.rgbToHex = rgbToHex;
/**
 * Returns a random rgb color in the form of [r, g, b] array.
 *
 * @example
 * random(); // [23, 33, 90]
 */
function random() {
    return [(0, exports.RANDOM)(255), (0, exports.RANDOM)(255), (0, exports.RANDOM)(255)];
}
exports.random = random;
/**
 * Returns a random color in the form of formatted hex.
 *
 * @example
 * randomHex(); // '#01060e'
 */
function randomHex() {
    return `#${(0, exports.RANDOM)(0xffffff).toString(16)}`;
}
exports.randomHex = randomHex;
/**
 * Reduces the decimals of the float to one decimal.
 */
function fixedFloat(num) {
    return parseFloat(num.toFixed(1));
}
exports.fixedFloat = fixedFloat;
