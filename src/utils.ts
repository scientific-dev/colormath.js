/**
 * A union type of [r, g, b] values or hexadecimal string.
 */
export type ColorValue = number[] | string;

/**
 * A lambda function to convert a ColorValue to rgb values.
 */
export const RGB = (x: ColorValue) => 
	typeof x == "string" ? hexToRgb(x) : x as number[];

/**
 * A lambda function to generate random numbers.
 */
export const RANDOM = m => Math.floor(Math.random() * m);

export class ColorResult {	

	constructor (public rgb: number[]) {}

	get hex () {
		return rgbToHex(this.rgb);
	}

	valueOf () {
		return this.hex;
	}

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
export function rawHex (hex: string): string {
	if (hex[0] == '#') hex = hex.slice(1);

	if (hex.length >= 6) return hex.slice(0, 6);
	else if (hex.length == 3) {
		let fmt = "";
		for (let i = 0; i < hex.length; i++) 
			fmt += `${hex[i]}${hex[i]}`;

		return fmt;
	} else return '000000';
}

/**
 * Formats the unformatted hex.
 * 
 * @param hex The hex.
 * @example
 * formatHex('1dc'); // '#11ddcc'
 * formatHex('7298da'); // '#7298da'
 */
export function formatHex (hex: string): string {
	return `#${rawHex(hex)}`;
}

/**
 * Breaks down a raw hex into [r, g, b].
 * 
 * @param hex The hex.
 * @example
 * breakHex('ffffff'); // [255, 255, 255]
 */
export function breakHex (hex: string): number[] {
	let x = parseInt(hex, 16);
	return [x >> 16, (x >> 8) & 0x00ff, x & 0x0000ff];
}

/**
 * Converts a rgb value to the component of hex.
 * 
 * @param x The value
 * @example
 * padHex(255); // 'ff'
 * padHex(0); // '00'
 */
export function padHex (x: number): string {
	let c = Math.round(x).toString(16);
	return `${c.length == 1 ? '0' : ''}${c}`
}

/**
 * Converts an unformatted hex string to [r, g, b].
 * 
 * @param hex The Hex
 * @example
 * hexToRgb('fff'); // [255, 255, 255]
 * hexToRgb('#000000'); // [0, 0, 0]
 * hexToRgb('#ffffff7f'); // [255, 255, 255, 0.5]
 */
export function hexToRgb (hex: string) {
	return breakHex(rawHex(hex));
}

/**
 * Converts a rgb array to a formatted hex.
 * 
 * @param param0 The [r, g, b, a] array.
 * @example
 * rgbToHex([255, 255, 255]); // '#ffffff'
 * rgbToHex([0, 0, 0]); // '#000000'
 * rgbToHex([255, 255, 255, 0.5]) // '#ffffff7f'
 */
export function rgbToHex ([r, g, b, a]: number[]): string {
	return `#${padHex(r)}${padHex(g)}${padHex(b)}${a ? padHex(a * 255) : ''}`;
}

/**
 * Returns a random rgb color in the form of [r, g, b] array.
 * 
 * @example
 * random(); // [23, 33, 90]
 */
export function random (): number[] {
	return [RANDOM(255), RANDOM(255), RANDOM(255)]
}

/**
 * Returns a random color in the form of formatted hex.
 * 
 * @example
 * randomHex(); // '#01060e'
 */
export function randomHex (): string {
	return `#${RANDOM(0xffffff).toString(16)}`;
}