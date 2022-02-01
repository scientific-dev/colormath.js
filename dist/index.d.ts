/**
 * A union type of [r, g, b] values or hexadecimal string.
 */
declare type ColorValue = number[] | string;
/**
 * A color result object returned by functions in "methods.ts".
 *
 * The main purpose of this function is to allow hex conversion for the rgb
 * array returned.
 */
declare class ColorResult {
    rgb: number[];
    constructor(rgb: number[]);
    /**
     * Converts rgb values into hex string.
     */
    get hex(): string;
    valueOf(): string;
}
/**
 * Extracts the raw hex from the hex string.
 *
 * @param hex The hex
 * @example
 * rawHex('1dc'); // '11ddcc'
 * rawHex('#1dc'); // '11ddcc'
 * rawHex('#11ddcc'); // '11ddcc'
 */
declare function rawHex(hex: string): string;
/**
 * Formats the unformatted hex.
 *
 * @param hex The hex.
 * @example
 * formatHex('1dc'); // '#11ddcc'
 * formatHex('7298da'); // '#7298da'
 */
declare function formatHex(hex: string): string;
/**
 * Breaks down a raw hex into [r, g, b].
 *
 * @param hex The hex.
 * @example
 * breakHex('ffffff'); // [255, 255, 255]
 */
declare function breakHex(hex: string): number[];
/**
 * Converts a rgb value to the component of hex.
 *
 * @param x The value
 * @example
 * padHex(255); // 'ff'
 * padHex(0); // '00'
 */
declare function padHex(x: number): string;
/**
 * Converts an unformatted hex string to [r, g, b].
 *
 * @param hex The Hex
 * @example
 * hexToRgb('fff'); // [255, 255, 255]
 * hexToRgb('#000000'); // [0, 0, 0]
 * hexToRgb('#ffffff7f'); // [255, 255, 255, 0.5]
 */
declare function hexToRgb(hex: string): number[];
/**
 * Converts a rgb array to a formatted hex.
 *
 * @param param0 The [r, g, b, a] array.
 * @example
 * rgbToHex([255, 255, 255]); // '#ffffff'
 * rgbToHex([0, 0, 0]); // '#000000'
 * rgbToHex([255, 255, 255, 0.5]) // '#ffffff7f'
 */
declare function rgbToHex([r, g, b, a]: number[]): string;
/**
 * Returns a random rgb color in the form of [r, g, b] array.
 *
 * @example
 * random(); // [23, 33, 90]
 */
declare function random(): number[];
/**
 * Returns a random color in the form of formatted hex.
 *
 * @example
 * randomHex(); // '#01060e'
 */
declare function randomHex(): string;

declare namespace hex {
    /**
     * Maximum hex value in the #rrggbb format.
     */
    const HEX_MAX = 16777215;
    /**
     * Directly exporting as a utility function.
     */
    const toRgb: typeof hexToRgb;
    /**
     * Converts a hexadecimal number to hex string.
     *
     * @param num The hexadecimal number.
     * @example
     * hex.fromInt(0x7298da); // '#7298da'
     */
    function fromInt(num: number): string;
    /**
     * Converts a hexadecimal string to the hexadecimal number.
     *
     * @param hex The hex string.
     * @example
     * hex.toInt('7298da'); // 0x7298da
     */
    function toInt(hex: string): number;
}
declare namespace rgb {
    /**
     * Directly exporting as utility function.
     */
    const toHex: typeof rgbToHex;
    /**
     * Converts a given rgb array into hsv values in the form of [h, s, v] array.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @examples
     * rgb.toHsv([255, 255, 255]); // [0, 0, 100]
     */
    function toHsv([r, g, b]: number[]): number[];
    /**
     * Converts a given rgb array into hsl values in the form of [h, s, l] array.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @examples
     * rgb.toHsl([255, 255, 255]); // [0, 0, 100]
     */
    function toHsl([r, g, b]: number[]): number[];
    /**
     * Converts a given rgb array into hwb values in the form of [h, w, b] array
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toHwb([255, 255, 255]); // [0, 100, 0]
     */
    function toHwb([r, g, b]: number[]): number[];
    /**
     * Converts a given rgb array into cmyk values in the form of [c, m, y, k] array.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toCmyk([255, 255, 255]); // [0, 0, 0, 0]
     */
    function toCmyk([r, g, b]: number[]): number[];
    /**
     * Converts a given rgb array into ansi 16 code.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @param value The value. Optional.
     * @example
     * rgb.toAnsi16([255, 0, 0]); // 91
     */
    function toAnsi16([r, g, b]: number[], value?: number | null): number;
    /**
     * Converts a given rgb array into ansi 256 code.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toAnsi256([255, 0, 0]); // 196
     */
    function toAnsi256([r, g, b]: number[]): number;
    /**
     * Converts a given rgb array into xyz values in the form of [x, y, z] spaces.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toXyz([255, 255, 255]); // [95.047, 100.00001, 108.883]
     */
    function toXyz([r, g, b]: number[]): number[];
    /**
     * Converts rgb values into lab values in the form of [l, a, b] array.
     * The values returned are not rounded.
     *
     * @param rgb The rgb values in the form of [r, g, b] array.
     */
    function toLab(rgb: number[]): number[];
    /**
     * Get the hue from the rgb color.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @param max The maximum value of the rgb array. Optional.
     * @param min The minimum value of the rgb array. Optional.
     */
    function toHue([r, g, b]: number[], max?: number, min?: number): number;
    /**
     * Get the grayscale percentage by rgb values.
     *
     * @param param0 The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toGray([255, 255, 255]); // 100
     */
    function toGray([r, g, b]: number[]): number;
    /**
     * Converts rgb values into apple color model.
     *
     * @param rgb The rgb values in the form of [r, g, b] array.
     * @example
     * rgb.toApple([255, 255, 255]); // [65535, 65535, 65535]
     */
    function toApple(rgb: number[]): number[];
}
declare namespace hsv {
    /**
     * Converts given hsv values into rgb values in the form of [r, g, b] array.
     *
     * @param param0 The hsv values in the form of [h, s, v] array.
     * @example
     * hsv.toRgb([0, 0, 100]); // [255, 255, 255]
     */
    function toRgb([h, s, v]: number[]): number[];
    /**
     * Converts given hsv values into formatted hex string.
     *
     * @param param0 The hsv values in the form of [h, s, v] array.
     * @example
     * hsv.toHex([0, 0, 100]); // '#ffffff'
     */
    function toHex(hsv: number[]): string;
    /**
     * Converts given hsv values into hsl values in the form of [h, s, l] array.
     *
     * @param param0 The hsv values in the form of [h, s, v] array.
     * @example
     * hsv.toHsl([0, 0, 100]); // [0, 0, 100]
     */
    function toHsl([h, s, v]: number[]): number[];
}
declare namespace hsl {
    /**
     * Converts given hsl values into rgb values in the form of [r, g, b] array.
     *
     * @param param0 The hsl values in the form of [h, s, l] array.
     * @examples
     * hsl.toRgb([0, 0, 100]); // [255, 255, 255]
     */
    function toRgb([h, s, l]: number[]): number[];
    /**
     * Converts given hsl values into hsv values in the form of [h, s, v] array.
     *
     * @param param0 The hsl values in the form of [h, s, l] array.
     */
    function toHsv([h, s, l]: number[]): number[];
    /**
     * Converts given hsl values into formatted hex string.
     *
     * @param hsl The hsv values in the form of [h, s, l] array.
     * @example
     * hsl.toHex([0, 0, 100]); // '#ffffff'
     */
    function toHex(hsl: number[]): string;
}
declare namespace hwb {
    /**
     * Converts given hwb values into rgb values.
     *
     * @param param0 The hwb values in the form of [h, w, b] array.
     */
    function toRgb([h, w, b]: number[]): number[];
}
declare namespace cmyk {
    /**
     * Converts a given cmyk array intro rgb values in the form of [r, g, b] array.
     *
     * @param param0 The cmyk values in the form of [c, m, y, k] array.
     * @example
     * cmyk.toRgb([0, 0, 0, 0]); // [255, 255, 255]
     */
    function toRgb([c, m, y, k]: number[]): number[];
    /**
     * Converts given cmyk values into formatted hex string.
     *
     * @param hsl The cmyk values in the form of [c, m, y, k] array.
     * @example
     * cmyk.toHex([0, 0, 0, 0]); // '#ffffff'
     */
    function toHex(hsl_: number[]): number[];
}
declare namespace xyz {
    /**
     * Converts xyz values into rgb in the form of [r, g, b] array.
     *
     * @param param0 The xyz values in the form of [x, y, z] array.
     * @example
     * xyz.toRgb([95.047, 100.00001, 108.883]); // [255, 255, 255]
     */
    function toRgb([x, y, z]: number[]): number[];
    /**
     * Converts xyz values into lab values in the form of [l, a, b] array.
     * The values are not rounded when returned by the function.
     *
     * @param param0 The xyz values in the form of [x, y, z] array.
     */
    function toLab([x, y, z]: number[]): number[];
}
declare namespace lab {
    /**
     * Converts lab values into rgb values in the form of [l, a, b] array.
     *
     * @param lab The lab values in the form of [l, a, b] array.
     */
    function toRgb(lab: number[]): number[];
    /**
     * Converts lab values into xyz values in the form of [x, y, z] array.
     * The values returned are not rounded.
     *
     * @param param0 The lab values in the form of [l, a, b] array.
     */
    function toXyz([l, a, b]: number[]): number[];
    /**
     * Converts lab values into lch values in the form of [l, c, h] array.
     *
     * @param param0 The lab values in the form of [l, a, b] array.
     */
    function toLch([l, a, b]: number[]): number[];
}
declare namespace lch {
    /**
     * Converts lch values into lab values in the form of [l, a, b] array.
     *
     * @param param0 The lch values in the form of [l, c, h] array.
     */
    function toLab([l, c, h]: number[]): number[];
}
declare namespace ansi16 {
    /**
     * Converts an ansi16 code to rgb values.
     *
     * @param n The ansi16 code.
     * @example
     * ansi16.toRgb(91); // [255, 0, 0]
     */
    function toRgb(n: number): number[];
}
declare namespace ansi256 {
    /**
     * Converts an ansi256 code to rgb values.
     *
     * @param n The ansi256 code.
     * @example
     * ansi256.toRgb(196); // [255, 0, 0]
     */
    function toRgb(n: number): number[];
}
declare namespace gray {
    type To = (n: number) => number[];
    export const toHsl: To;
    export const toHsv: To;
    export const toHwb: To;
    export const toCmyk: To;
    export const toLab: To;
    /**
     * Converts grayscale percentage to rgb values in the form of [r, g, b] array.
     *
     * @param gray The grayscale percentage
     * @example
     * gray.toRgb(100); // [255, 255, 255]
     */
    export function toRgb(gray: number): number[];
    /**
     * Converts grayscale percentage to hex string.
     *
     * @param gray The gray scale percentage.
     * @example
     * gray.toHex(255); // '#ffffff'
     */
    export function toHex(gray: number): string;
    export {};
}
declare namespace apple {
    /**
     * Converts apple code color to rgb values in form of [r, g, b] array.
     *
     * @param apple The apple color model.
     * @example
     * apple.toRgb([65535, 65535, 65535]); // [255, 255, 255]
     */
    function toRgb(rgb: number[]): number[];
}

/**
 * Returns the inverted color of the provided color value.
 *
 * @param color The [r, g, b] array or hex string.
 */
declare function invert(color: ColorValue): ColorResult;
/**
 * Rotates the hue variable by provided degree.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The degree the hue variable to be rotated. Value ranges from 0 to 360. Default value is 30.
 */
declare function hue(color: ColorValue, value?: number): ColorResult;
/**
 * Returns the complementary color of the provided color.
 *
 * @param color The [r, g, b] array or hex string.
 */
declare function complement(color: ColorValue): ColorResult;
/**
 * Saturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The saturation amount. Value ranges from 0 to 100. Default value is 20.
 */
declare function saturate(color: ColorValue, value?: number): ColorResult;
/**
 * Desaturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The desaturation amount. Value ranges from 0 to 100. Default value is 20.
 */
declare function desaturate(color: ColorValue, value?: number): ColorResult;
/**
 * Converts a color into grayscale.
 *
 * @param color The [r, g, b] array or hex string.
 */
declare function grayscale(color: ColorValue): ColorResult;
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
declare function mixColor(colorA: ColorValue, colorB: ColorValue, amount?: number): ColorResult;
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
declare function lighten(color: ColorValue, amount?: number): ColorResult;
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
declare function darken(color: ColorValue, amount?: number): ColorResult;

export { ColorResult, ColorValue, ansi16, ansi256, apple, breakHex, cmyk, complement, darken, desaturate, formatHex, gray, grayscale, hex, hsl, hsv, hue, hwb, invert, lab, lch, lighten, mixColor, padHex, random, randomHex, rawHex, rgb, saturate, xyz };
