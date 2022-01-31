import { hexToRgb, rgbToHex } from "./utils";
export declare namespace hex {
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
export declare namespace rgb {
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
    function toApple([r, g, b]: number[]): number[];
}
export declare namespace hsv {
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
export declare namespace hsl {
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
export declare namespace hwb {
    /**
     * Converts given hwb values into rgb values.
     *
     * @param param0 The hwb values in the form of [h, w, b] array.
     */
    function toRgb([h, w, b]: number[]): number[];
}
export declare namespace cmyk {
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
export declare namespace xyz {
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
export declare namespace lab {
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
export declare namespace lch {
    /**
     * Converts lch values into lab values in the form of [l, a, b] array.
     *
     * @param param0 The lch values in the form of [l, c, h] array.
     */
    function toLab([l, c, h]: number[]): number[];
}
export declare namespace ansi16 {
    /**
     * Converts an ansi16 code to rgb values.
     *
     * @param n The ansi16 code.
     * @example
     * ansi16.toRgb(91); // [255, 0, 0]
     */
    function toRgb(n: number): number[];
}
export declare namespace ansi256 {
    /**
     * Converts an ansi256 code to rgb values.
     *
     * @param n The ansi256 code.
     * @example
     * ansi256.toRgb(196); // [255, 0, 0]
     */
    function toRgb(n: number): number[];
}
export declare namespace gray {
    /**
     * Converts grayscale percentage to rgb values in the form of [r, g, b] array.
     *
     * @param gray The grayscale percentage
     * @example
     * gray.toRgb(100); // [255, 255, 255]
     */
    function toRgb(gray: number): number[];
    function toHsl(gray: number): number[];
    function toHsv(gray: number): number[];
    function toHwb(gray: number): number[];
    function toCmyx(gray: number): number[];
    function toLab(gray: number): number[];
    function toHex(gray: number): string;
}
export declare namespace apple {
    /**
     * Converts apple code color to rgb values in form of [r, g, b] array.
     *
     * @param apple code color
     * @example
     * apple.toRgb([65535, 65535, 65535])
     */
    function toRgb([r, g, b]: number[]): number[];
}
