/**
 * A union type of [r, g, b] values or hexadecimal string.
 */
export declare type ColorValue = number[] | string;
/**
 * A lambda function to convert a ColorValue to rgb values.
 */
export declare const RGB: (x: ColorValue) => number[];
/**
 * A lambda function to generate random numbers.
 */
export declare const RANDOM: (m: any) => number;
/**
 * A color result object returned by functions in "methods.ts".
 *
 * The main purpose of this function is to allow hex conversion for the rgb
 * array returned.
 */
export declare class ColorResult {
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
export declare function rawHex(hex: string): string;
/**
 * Formats the unformatted hex.
 *
 * @param hex The hex.
 * @example
 * formatHex('1dc'); // '#11ddcc'
 * formatHex('7298da'); // '#7298da'
 */
export declare function formatHex(hex: string): string;
/**
 * Breaks down a raw hex into [r, g, b].
 *
 * @param hex The hex.
 * @example
 * breakHex('ffffff'); // [255, 255, 255]
 */
export declare function breakHex(hex: string): number[];
/**
 * Converts a rgb value to the component of hex.
 *
 * @param x The value
 * @example
 * padHex(255); // 'ff'
 * padHex(0); // '00'
 */
export declare function padHex(x: number): string;
/**
 * Converts an unformatted hex string to [r, g, b].
 *
 * @param hex The Hex
 * @example
 * hexToRgb('fff'); // [255, 255, 255]
 * hexToRgb('#000000'); // [0, 0, 0]
 * hexToRgb('#ffffff7f'); // [255, 255, 255, 0.5]
 */
export declare function hexToRgb(hex: string): number[];
/**
 * Converts a rgb array to a formatted hex.
 *
 * @param param0 The [r, g, b, a] array.
 * @example
 * rgbToHex([255, 255, 255]); // '#ffffff'
 * rgbToHex([0, 0, 0]); // '#000000'
 * rgbToHex([255, 255, 255, 0.5]) // '#ffffff7f'
 */
export declare function rgbToHex([r, g, b, a]: number[]): string;
/**
 * Returns a random rgb color in the form of [r, g, b] array.
 *
 * @example
 * random(); // [23, 33, 90]
 */
export declare function random(): number[];
/**
 * Returns a random color in the form of formatted hex.
 *
 * @example
 * randomHex(); // '#01060e'
 */
export declare function randomHex(): string;
/**
 * Reduces the decimals of the float to one decimal.
 */
export declare function fixedFloat(num: number): number;
