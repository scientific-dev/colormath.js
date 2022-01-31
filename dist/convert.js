"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apple = exports.gray = exports.ansi256 = exports.ansi16 = exports.lch = exports.lab = exports.xyz = exports.cmyk = exports.hwb = exports.hsl = exports.hsv = exports.rgb = exports.hex = void 0;
const utils_1 = require("./utils");
var hex;
(function (hex_1) {
    /**
     * Maximum hex value in the #rrggbb format.
     */
    hex_1.HEX_MAX = 0xffffff;
    /**
     * Directly exporting as a utility function.
     */
    hex_1.toRgb = utils_1.hexToRgb;
    /**
     * Converts a hexadecimal number to hex string.
     *
     * @param num The hexadecimal number.
     * @example
     * hex.fromInt(0x7298da); // '#7298da'
     */
    function fromInt(num) {
        let str = Math.min(num, hex_1.HEX_MAX).toString(16);
        return `#${'0'.repeat(6 - str.length)}${str}`;
    }
    hex_1.fromInt = fromInt;
    /**
     * Converts a hexadecimal string to the hexadecimal number.
     *
     * @param hex The hex string.
     * @example
     * hex.toInt('7298da'); // 0x7298da
     */
    function toInt(hex) {
        return Math.min(parseInt((0, utils_1.rawHex)(hex), 16), hex_1.HEX_MAX);
    }
    hex_1.toInt = toInt;
})(hex = exports.hex || (exports.hex = {}));
var rgb;
(function (rgb_1) {
    /**
     * Directly exporting as utility function.
     */
    rgb_1.toHex = utils_1.rgbToHex;
    /**
     * Converts a given rgb array into hsv values in the form of [h, s, v] array.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @examples
     * rgb.toHsv([255, 255, 255]); // [0, 0, 100]
     */
    function toHsv([r, g, b]) {
        r /= 255, g /= 255, b /= 255;
        let min = Math.min(r, g, b);
        let max = Math.max(r, g, b);
        if (min == max)
            return [0, 0, min];
        let diff = max - min;
        return [toHue([r, g, b], max, min), (0, utils_1.fixedFloat)(100 * diff / max), (0, utils_1.fixedFloat)(100 * max)];
    }
    rgb_1.toHsv = toHsv;
    /**
     * Converts a given rgb array into hsl values in the form of [h, s, l] array.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @examples
     * rgb.toHsl([255, 255, 255]); // [0, 0, 100]
     */
    function toHsl([r, g, b]) {
        r /= 255, g /= 255, b /= 255;
        let min = Math.min(r, g, b);
        let max = Math.max(r, g, b);
        let diff = max - min;
        let l = (max + min) / 2;
        let h = 0, s = 0;
        if (max != min) {
            s = max == min ? 0 : diff / (l > 0.5 ? (2 - diff) : (max + min));
            h = toHue([r, g, b], max, min);
        }
        return [h, (0, utils_1.fixedFloat)(s * 100), (0, utils_1.fixedFloat)(l * 100)];
    }
    rgb_1.toHsl = toHsl;
    /**
     * Converts a given rgb array into hwb values in the form of [h, w, b] array
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toHwb([255, 255, 255]); // [0, 100, 0]
     */
    function toHwb([r, g, b]) {
        let min = Math.min(r, g, b);
        let max = Math.max(r, g, b);
        return [
            toHue([r, g, b], max, min),
            (0, utils_1.fixedFloat)((100 / 255) * min),
            (0, utils_1.fixedFloat)(100 * (1 - 1 / 255 * max))
        ];
    }
    rgb_1.toHwb = toHwb;
    /**
     * Converts a given rgb array into cmyk values in the form of [c, m, y, k] array.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toCmyk([255, 255, 255]); // [0, 0, 0, 0]
     */
    function toCmyk([r, g, b]) {
        let c = 1 - (r / 255);
        let m = 1 - (g / 255);
        let y = 1 - (b / 255);
        let k = Math.min(c, m, y);
        let x = 1 - k;
        let f = n => (0, utils_1.fixedFloat)(((n - k) / x) * 255);
        return [f(c), f(m), f(y), (0, utils_1.fixedFloat)(k * 255)];
    }
    rgb_1.toCmyk = toCmyk;
    /**
     * Converts a given rgb array into ansi 16 code.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @param value The value. Optional.
     * @example
     * rgb.toAnsi16([255, 0, 0]); // 91
     */
    function toAnsi16([r, g, b], value = null) {
        value = Math.round((typeof value == "number" ? value : toHsv([r, g, b])[2]) / 50);
        if (!value)
            return 30;
        let ansi = 30 + ((Math.round(b / 255) << 2) | (Math.round(g / 255) << 1) | Math.round(r / 255));
        if (value == 2)
            ansi += 60;
        return ansi;
    }
    rgb_1.toAnsi16 = toAnsi16;
    /**
     * Converts a given rgb array into ansi 256 code.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toAnsi256([255, 0, 0]); // 196
     */
    function toAnsi256([r, g, b]) {
        if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
            if (r < 8)
                return 16;
            if (r > 248)
                return 231;
            return Math.round(((r - 8) / 247) * 24) + 232;
        }
        return 16
            + (36 * Math.round(r / 255 * 5))
            + (6 * Math.round(g / 255 * 5))
            + Math.round(b / 255 * 5);
    }
    rgb_1.toAnsi256 = toAnsi256;
    /**
     * Converts a given rgb array into xyz values in the form of [x, y, z] spaces.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toXyz([255, 255, 255]); // [95.047, 100.00001, 108.883]
     */
    function toXyz([r, g, b]) {
        let f = n => {
            n /= 255;
            return n > 0.04045 ? (((n + 0.055) / 1.055) ** 2.4) : (n / 12.92);
        };
        r = f(r), g = f(g), b = f(b);
        let x = (r * 0.4124564) + (g * 0.3575761) + (b * 0.1804375);
        let y = (r * 0.2126729) + (g * 0.7151522) + (b * 0.072175);
        let z = (r * 0.0193339) + (g * 0.119192) + (b * 0.9503041);
        return [x * 100, y * 100, z * 100];
    }
    rgb_1.toXyz = toXyz;
    /**
     * Converts rgb values into lab values in the form of [l, a, b] array.
     * The values returned are not rounded.
     *
     * @param rgb The rgb values in the form of [r, g, b] array.
     */
    function toLab(rgb) {
        return xyz.toLab(toXyz(rgb));
    }
    rgb_1.toLab = toLab;
    /**
     * Get the hue from the rgb color.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @param max The maximum value of the rgb array. Optional.
     * @param min The minimum value of the rgb array. Optional.
     */
    function toHue([r, g, b], max, min) {
        if (!min || !max) {
            max = Math.max(r, g, b);
            min = Math.min(r, g, b);
        }
        let rIsMin = r == min;
        let bIsMin = b == min;
        let h = rIsMin ? 3 : bIsMin ? 1 : 5;
        let d = rIsMin ? g - b : bIsMin ? r - g : b - r;
        return (0, utils_1.fixedFloat)((h - d / (max - min)) * 60);
    }
    rgb_1.toHue = toHue;
    /**
     * Get the grayscale percentage by rgb values.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toGray([255, 255, 255]); // 100
     */
    function toGray([r, g, b]) {
        return (0, utils_1.fixedFloat)((r + g + b) / 765 * 100);
    }
    rgb_1.toGray = toGray;
    function toApple([r, g, b]) {
        const a = (r / 255) * 65535;
        const x = (g / 255) * 65535;
        const c = (b / 255) * 65535;
        return [a, x, c];
    }
    rgb_1.toApple = toApple;
})(rgb = exports.rgb || (exports.rgb = {}));
var hsv;
(function (hsv_1) {
    /**
     * Converts given hsv values into rgb values in the form of [r, g, b] array.
     *
     * @param param0 The hsv values in the form of [h, s, v] array.
     * @example
     * hsv.toRgb([0, 0, 100]); // [255, 255, 255]
     */
    function toRgb([h, s, v]) {
        s /= 100, v /= 100;
        let result = [0, 0, 0];
        let i = Math.floor((h / 60) % 6);
        let f = (h / 60) - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0:
                result = [v, t, p];
                break;
            case 1:
                result = [q, v, p];
                break;
            case 2:
                result = [p, v, t];
                break;
            case 3:
                result = [p, q, v];
                break;
            case 4:
                result = [t, p, v];
                break;
            case 5:
                result = [v, p, q];
                break;
        }
        return result.map(x => (0, utils_1.fixedFloat)(x * 255));
    }
    hsv_1.toRgb = toRgb;
    /**
     * Converts given hsv values into formatted hex string.
     *
     * @param param0 The hsv values in the form of [h, s, v] array.
     * @example
     * hsv.toHex([0, 0, 100]); // '#ffffff'
     */
    function toHex(hsv) {
        return (0, utils_1.rgbToHex)(toRgb(hsv));
    }
    hsv_1.toHex = toHex;
    /**
     * Converts given hsv values into hsl values in the form of [h, s, l] array.
     *
     * @param param0 The hsv values in the form of [h, s, v] array.
     * @example
     * hsv.toHsl([0, 0, 100]); // [0, 0, 100]
     */
    function toHsl([h, s, v]) {
        s /= 100, v /= 100;
        let max = Math.max(0.01, v);
        let l = (2 - s) * v;
        let l2 = (2 - s) * max;
        let s2 = (s * max) / (l2 > 1 ? 2 - l2 : l2);
        return [h, (0, utils_1.fixedFloat)(s2 * 100), (0, utils_1.fixedFloat)(l * 50)];
    }
    hsv_1.toHsl = toHsl;
})(hsv = exports.hsv || (exports.hsv = {}));
var hsl;
(function (hsl_1) {
    /**
     * Converts given hsl values into rgb values in the form of [r, g, b] array.
     *
     * @param param0 The hsl values in the form of [h, s, l] array.
     * @examples
     * hsl.toRgb([0, 0, 100]); // [255, 255, 255]
     */
    function toRgb([h, s, l]) {
        s /= 100, l /= 100;
        let k = n => (n + h / 30) % 12;
        let a = s * Math.min(l, 1 - l);
        let f = n => (0, utils_1.fixedFloat)((l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255);
        return [f(0), f(8), f(4)];
    }
    hsl_1.toRgb = toRgb;
    /**
     * Converts given hsl values into hsv values in the form of [h, s, v] array.
     *
     * @param param0 The hsl values in the form of [h, s, l] array.
     */
    function toHsv([h, s, l]) {
        s /= 100, l /= 100;
        let max = Math.max(0.01, l);
        let s2 = s;
        l *= 2,
            s *= l > 1 ? 2 - l : l,
            s2 *= max > 1 ? 2 - max : max;
        let S = l == 0 ? (s2 * 2) / (max + s2) : (2 * s) / (l + s);
        let V = (l + s) / 2;
        return [h, (0, utils_1.fixedFloat)(S * 100), (0, utils_1.fixedFloat)(V * 100)];
    }
    hsl_1.toHsv = toHsv;
    /**
     * Converts given hsl values into formatted hex string.
     *
     * @param hsl The hsv values in the form of [h, s, l] array.
     * @example
     * hsl.toHex([0, 0, 100]); // '#ffffff'
     */
    function toHex(hsl) {
        return (0, utils_1.rgbToHex)(toRgb(hsl));
    }
    hsl_1.toHex = toHex;
})(hsl = exports.hsl || (exports.hsl = {}));
var hwb;
(function (hwb) {
    /**
     * Converts given hwb values into rgb values.
     *
     * @param param0 The hwb values in the form of [h, w, b] array.
     */
    function toRgb([h, w, b]) {
        return hsl.toRgb([h, 100, 50]).map(v => v * (100 - w - b) / 100 + w);
    }
    hwb.toRgb = toRgb;
})(hwb = exports.hwb || (exports.hwb = {}));
var cmyk;
(function (cmyk) {
    /**
     * Converts a given cmyk array intro rgb values in the form of [r, g, b] array.
     *
     * @param param0 The cmyk values in the form of [c, m, y, k] array.
     * @example
     * cmyk.toRgb([0, 0, 0, 0]); // [255, 255, 255]
     */
    function toRgb([c, m, y, k]) {
        c /= 100, m /= 100, y /= 100, k /= 100;
        let x = 1 - k;
        let f = n => (0, utils_1.fixedFloat)((1 - (n * x + k)) * 255);
        return [f(c), f(m), f(y)];
    }
    cmyk.toRgb = toRgb;
    /**
     * Converts given cmyk values into formatted hex string.
     *
     * @param hsl The cmyk values in the form of [c, m, y, k] array.
     * @example
     * cmyk.toHex([0, 0, 0, 0]); // '#ffffff'
     */
    function toHex(hsl_) {
        return rgb.toCmyk(hsl.toRgb(hsl_));
    }
    cmyk.toHex = toHex;
})(cmyk = exports.cmyk || (exports.cmyk = {}));
var xyz;
(function (xyz) {
    /**
     * Converts xyz values into rgb in the form of [r, g, b] array.
     *
     * @param param0 The xyz values in the form of [x, y, z] array.
     * @example
     * xyz.toRgb([95.047, 100.00001, 108.883]); // [255, 255, 255]
     */
    function toRgb([x, y, z]) {
        x /= 100, y /= 100, z /= 100;
        let f = n => {
            n = n > 0.0031308
                ? ((1.055 * (n ** (1.0 / 2.4))) - 0.055)
                : n * 12.92;
            return (0, utils_1.fixedFloat)(Math.min(Math.max(0, n), 1) * 255);
        };
        return [
            f((x * 3.2404542) + (y * -1.5371385) + (z * -0.4985314)),
            f((x * -0.969266) + (y * 1.8760108) + (z * 0.041556)),
            f((x * 0.0556434) + (y * -0.2040259) + (z * 1.0572252))
        ];
    }
    xyz.toRgb = toRgb;
    /**
     * Converts xyz values into lab values in the form of [l, a, b] array.
     * The values are not rounded when returned by the function.
     *
     * @param param0 The xyz values in the form of [x, y, z] array.
     */
    function toLab([x, y, z]) {
        let f = n => n > 0.008856 ? (n ** (1 / 3)) : (7.787 * n) + (16 / 116);
        x = f(x / 95.047), y = f(y / 100), z = f(z / 108.883);
        return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)];
    }
    xyz.toLab = toLab;
})(xyz = exports.xyz || (exports.xyz = {}));
var lab;
(function (lab_1) {
    /**
     * Converts lab values into rgb values in the form of [l, a, b] array.
     *
     * @param lab The lab values in the form of [l, a, b] array.
     */
    function toRgb(lab) {
        return xyz.toRgb(toXyz(lab));
    }
    lab_1.toRgb = toRgb;
    /**
     * Converts lab values into xyz values in the form of [x, y, z] array.
     * The values returned are not rounded.
     *
     * @param param0 The lab values in the form of [l, a, b] array.
     */
    function toXyz([l, a, b]) {
        let y = (l + 16) / 116;
        let x = a / 500 + y;
        let z = y - b / 200;
        let f = n => {
            let n2 = n ** 3;
            return n2 > 0.008856 ? n2 : (n - 16 / 116) / 7.787;
        };
        return [f(x) * 95.047, f(y) * 100, f(z) * 108.883];
    }
    lab_1.toXyz = toXyz;
    /**
     * Converts lab values into lch values in the form of [l, c, h] array.
     *
     * @param param0 The lab values in the form of [l, a, b] array.
     */
    function toLch([l, a, b]) {
        let h = Math.atan2(b, a) * 360 / 2 / Math.PI;
        if (h < 0)
            h += 360;
        return [l, Math.sqrt(a * a + b * b), h];
    }
    lab_1.toLch = toLch;
})(lab = exports.lab || (exports.lab = {}));
var lch;
(function (lch) {
    /**
     * Converts lch values into lab values in the form of [l, a, b] array.
     *
     * @param param0 The lch values in the form of [l, c, h] array.
     */
    function toLab([l, c, h]) {
        let hr = h / 360 * 2 * Math.PI;
        return [l, c * Math.cos(hr), c * Math.sin(hr)];
    }
    lch.toLab = toLab;
})(lch = exports.lch || (exports.lch = {}));
var ansi16;
(function (ansi16) {
    /**
     * Converts an ansi16 code to rgb values.
     *
     * @param n The ansi16 code.
     * @example
     * ansi16.toRgb(91); // [255, 0, 0]
     */
    function toRgb(n) {
        let color = n % 10;
        if (color === 0 || color === 7) {
            if (n > 50)
                color += 3.5;
            color /= 10.5 * 255;
            return [color, color, color];
        }
        let mult = (~~(n > 50) + 1) * 0.5;
        return [
            (0, utils_1.fixedFloat)(((color & 1) * mult) * 255),
            (0, utils_1.fixedFloat)((((color >> 1) & 1) * mult) * 255),
            (0, utils_1.fixedFloat)((((color >> 2) & 1) * mult) * 255)
        ];
    }
    ansi16.toRgb = toRgb;
})(ansi16 = exports.ansi16 || (exports.ansi16 = {}));
var ansi256;
(function (ansi256) {
    /**
     * Converts an ansi256 code to rgb values.
     *
     * @param n The ansi256 code.
     * @example
     * ansi256.toRgb(196); // [255, 0, 0]
     */
    function toRgb(n) {
        if (n >= 232) {
            let color = (n - 232) * 10 + 8;
            return [color, color, color];
        }
        n -= 16;
        let rem = n % 36;
        return [
            (0, utils_1.fixedFloat)(Math.floor(n / 36) / 5 * 255),
            (0, utils_1.fixedFloat)(Math.floor(rem / 6) / 5 * 255),
            (0, utils_1.fixedFloat)((rem % 6) / 5 * 255)
        ];
    }
    ansi256.toRgb = toRgb;
})(ansi256 = exports.ansi256 || (exports.ansi256 = {}));
var gray;
(function (gray_1) {
    /**
     * Converts grayscale percentage to rgb values in the form of [r, g, b] array.
     *
     * @param gray The grayscale percentage
     * @example
     * gray.toRgb(100); // [255, 255, 255]
     */
    function toRgb(gray) {
        let x = (0, utils_1.fixedFloat)(gray / 100 * 255);
        return [x, x, x];
    }
    gray_1.toRgb = toRgb;
    function toHsl(gray) {
        return [0, 0, gray];
    }
    gray_1.toHsl = toHsl;
    function toHsv(gray) {
        return [0, 0, gray / 100];
    }
    gray_1.toHsv = toHsv;
    function toHwb(gray) {
        return [0, 100, gray];
    }
    gray_1.toHwb = toHwb;
    function toCmyx(gray) {
        return [0, 0, 0, gray];
    }
    gray_1.toCmyx = toCmyx;
    function toLab(gray) {
        return [gray, 0, 0];
    }
    gray_1.toLab = toLab;
    function toHex(gray) {
        let value = Math.round(gray / 100 * 255) & 0xFF;
        return hex.fromInt((value << 16) + (value << 8) + value);
    }
    gray_1.toHex = toHex;
})(gray = exports.gray || (exports.gray = {}));
var apple;
(function (apple) {
    /**
     * Converts apple code color to rgb values in form of [r, g, b] array.
     *
     * @param apple code color
     * @example
     * apple.toRgb([65535, 65535, 65535])
     */
    function toRgb([r, g, b]) {
        const newR = (r / 65535) * 255;
        const newG = (g / 65535) * 255;
        const newB = (b / 65535) * 255;
        return [newR, newG, newB];
    }
    apple.toRgb = toRgb;
})(apple = exports.apple || (exports.apple = {}));
