import { rawHex, hexToRgb, rgbToHex, fixedFloat } from "./utils";

export namespace hex {

	/**
	 * Maximum hex value in the #rrggbb format.
	 */
	export const HEX_MAX = 0xffffff;

	/**
	 * Directly exporting as a utility function.
	 */
	export const toRgb = hexToRgb;

	/**
	 * Converts a hexadecimal number to hex string.
	 * 
	 * @param num The hexadecimal number.
	 * @example
	 * hex.fromInt(0x7298da); // '#7298da'
	 */
	export function fromInt (num: number): string {
		let str = Math.min(num, HEX_MAX).toString(16);
		return `#${'0'.repeat(6 - str.length)}${str}`;
	}

	/**
	 * Converts a hexadecimal string to the hexadecimal number.
	 * 
	 * @param hex The hex string.
	 * @example
	 * hex.toInt('7298da'); // 0x7298da
	 */
	export function toInt (hex: string): number {
		return Math.min(parseInt(rawHex(hex), 16), HEX_MAX);
	}

}

export namespace rgb {

	/**
	 * Directly exporting as utility function.
	 */
	export const toHex = rgbToHex;

	/**
	 * Converts a given rgb array into hsv values in the form of [h, s, v] array.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @examples
	 * rgb.toHsv([255, 255, 255]); // [0, 0, 100]
	 */
	export function toHsv ([r, g, b]: number[]): number[] {
		r /= 255, g /= 255, b /= 255;
	
		let min = Math.min(r, g, b);
		let max = Math.max(r, g, b);
	
		if (min == max) return [0, 0, min];
		let diff = max - min;
	
		return [toHue([r, g, b], max, min), fixedFloat(100 * diff / max), fixedFloat(100 * max)];
	}
	
	/**
	 * Converts a given rgb array into hsl values in the form of [h, s, l] array.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @examples
	 * rgb.toHsl([255, 255, 255]); // [0, 0, 100]
	 */
	export function toHsl ([r, g, b]: number[]): number[] {
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
	
		return [h, fixedFloat(s * 100), fixedFloat(l * 100)];
	}

	/**
	 * Converts a given rgb array into hwb values in the form of [h, w, b] array
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @example
	 * rgb.toHwb([255, 255, 255]); // [0, 100, 0]
	 */
	export function toHwb ([r, g, b]: number[]): number[] {
		let min = Math.min(r, g, b);
		let max = Math.max(r, g, b);

		return [
			toHue([r, g, b], max, min),
			fixedFloat((100 / 255) * min),
			fixedFloat(100 * (1 - 1 / 255 * max))
		];
	}
	
	/**
	 * Converts a given rgb array into cmyk values in the form of [c, m, y, k] array.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @example 
	 * rgb.toCmyk([255, 255, 255]); // [0, 0, 0, 0]
	 */
	export function toCmyk ([r, g, b]: number[]): number[] {
		let c = 1 - (r / 255);
		let m = 1 - (g / 255);
		let y = 1 - (b / 255);
		let k = Math.min(c, m, y);
		let x = 1 - k;
		let f = n => fixedFloat(((n - k) / x) * 255);
	
		return [f(c), f(m), f(y), fixedFloat(k * 255)];
	}

	/**
	 * Converts a given rgb array into ansi 16 code.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @param value The value. Optional.
	 * @example
	 * rgb.toAnsi16([255, 0, 0]); // 91
	 */
	export function toAnsi16 ([r, g, b]: number[], value: number | null = null): number {
		value = Math.round((typeof value == "number" ? value : toHsv([r, g, b])[2]) / 50);
		if (!value) return 30;

		let ansi = 30 + ((Math.round(b / 255) << 2) | (Math.round(g / 255) << 1) | Math.round(r / 255));
		if (value == 2) ansi += 60;

		return ansi;
	}

	/**
	 * Converts a given rgb array into ansi 256 code.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @example
	 * rgb.toAnsi256([255, 0, 0]); // 196
	 */
	export function toAnsi256 ([r, g, b]: number[]): number {
		if (r >> 4 === g >> 4 && g >> 4 === b >> 4) {
			if (r < 8) return 16;
			if (r > 248) return 231;
			return Math.round(((r - 8) / 247) * 24) + 232;
		}

		return 16
			+ (36 * Math.round(r / 255 * 5))
			+ (6 * Math.round(g / 255 * 5))
			+ Math.round(b / 255 * 5);
	}

	/**
	 * Converts a given rgb array into xyz values in the form of [x, y, z] spaces.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @example
	 * rgb.toXyz([255, 255, 255]); // [95.047, 100.00001, 108.883]
	 */
	export function toXyz ([r, g, b]: number[]): number[] {
		let f = n => {
			n /= 255;
			return n > 0.04045 ? (((n + 0.055) / 1.055) ** 2.4) : (n / 12.92);
		}

		r = f(r), g = f(g), b = f(b);
		
		let x = (r * 0.4124564) + (g * 0.3575761) + (b * 0.1804375);
		let y = (r * 0.2126729) + (g * 0.7151522) + (b * 0.072175);
		let z = (r * 0.0193339) + (g * 0.119192) + (b * 0.9503041);
		
		return [x * 100, y * 100, z * 100];
	}

	/**
	 * Converts rgb values into lab values in the form of [l, a, b] array.
	 * The values returned are not rounded.
	 * 
	 * @param rgb The rgb values in the form of [r, g, b] array.
	 */
	export function toLab (rgb: number[]): number[] {
		return xyz.toLab(toXyz(rgb));
	}

	/**
	 * Get the hue from the rgb color.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @param max The maximum value of the rgb array. Optional.
	 * @param min The minimum value of the rgb array. Optional.
	 */
	export function toHue ([r, g, b]: number[], max?: number, min?: number): number {
		if (!min || !max) {
			max = Math.max(r, g, b);
			min = Math.min(r, g, b);
		}

		let rIsMin = r == min;
		let bIsMin = b == min;
		let h = rIsMin ? 3 : bIsMin ? 1 : 5;
		let d = rIsMin ? g - b : bIsMin ? r - g : b - r;

		return fixedFloat((h - d / (max - min)) * 60);
	}

	/**
	 * Get the grayscale percentage by rgb values.
	 * 
	 * @param param0 The rgb values in the form of [r, g, b] array.
	 * @example
	 * rgb.toGray([255, 255, 255]); // 100
	 */
	export function toGray ([r, g, b]: number[]): number {
		return fixedFloat((r + g + b) / 765 * 100);
	}

}

export namespace hsv {

	/**
	 * Converts given hsv values into rgb values in the form of [r, g, b] array.
	 * 
	 * @param param0 The hsv values in the form of [h, s, v] array.
	 * @example
	 * hsv.toRgb([0, 0, 100]); // [255, 255, 255]
	 */
	export function toRgb ([h, s, v]: number[]): number[] {
		s /= 100, v /= 100;
	
		let result = [0, 0, 0] as number[];
		let i = Math.floor((h / 60) % 6);
		let f = (h / 60) - i;
		let p = v * (1 - s);
		let q = v * (1 - f * s);
		let t = v * (1 - (1 - f) * s);
	
		switch (i % 6) {
			case 0: result = [v, t, p]; break;
			case 1: result = [q, v, p]; break;
			case 2: result = [p, v, t]; break;
			case 3: result = [p, q, v]; break;
			case 4: result = [t, p, v]; break;
			case 5: result = [v, p, q]; break;
		}

		return result.map(x => fixedFloat(x * 255)) as number[];
	}
	
	/**
	 * Converts given hsv values into formatted hex string.
	 * 
	 * @param param0 The hsv values in the form of [h, s, v] array.
	 * @example
	 * hsv.toHex([0, 0, 100]); // '#ffffff'
	 */
	export function toHex (hsv: number[]): string {
		return rgbToHex(toRgb(hsv));
	}
	
	/**
	 * Converts given hsv values into hsl values in the form of [h, s, l] array.
	 * 
	 * @param param0 The hsv values in the form of [h, s, v] array.
	 * @example
	 * hsv.toHsl([0, 0, 100]); // [0, 0, 100]
	 */
	export function toHsl ([h, s, v]: number[]): number[] {
		s /= 100, v /= 100;

		let max = Math.max(0.01, v);
		let l = (2 - s) * v;
		let l2 = (2 - s) * max;
		let s2 = (s * max) / (l2 > 1 ? 2 - l2 : l2);

		return [h, fixedFloat(s2 * 100), fixedFloat(l * 50)];
	}

}

export namespace hsl {

	/**
	 * Converts given hsl values into rgb values in the form of [r, g, b] array.
	 * 
	 * @param param0 The hsl values in the form of [h, s, l] array.
	 * @examples
	 * hsl.toRgb([0, 0, 100]); // [255, 255, 255]
	 */
	export function toRgb ([h, s, l]: number[]): number[] {
		s /= 100, l /= 100;
	
		let k = n => (n + h / 30) % 12;
		let a = s * Math.min(l, 1 - l);
		let f = n => fixedFloat((l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))) * 255);
	
		return [f(0), f(8), f(4)];
	}

	/**
	 * Converts given hsl values into hsv values in the form of [h, s, v] array.
	 * 
	 * @param param0 The hsl values in the form of [h, s, l] array.
	 */
	export function toHsv ([h, s, l]: number[]): number[] {
		s /= 100, l /= 100;

		let max = Math.max(0.01, l);
		let s2 = s;

		l *= 2, 
		s *= l > 1 ? 2 - l : l,
		s2 *= max > 1 ? 2 - max : max;

		let S = l == 0 ? (s2 * 2) / (max + s2) : (2 * s) / (l + s);
		let V = (l + s) / 2;

		return [h, fixedFloat(S * 100), fixedFloat(V * 100)];
	}
	
	/**
	 * Converts given hsl values into formatted hex string.
	 * 
	 * @param hsl The hsv values in the form of [h, s, l] array.
	 * @example
	 * hsl.toHex([0, 0, 100]); // '#ffffff'
	 */
	export function toHex (hsl: number[]): string {
		return rgbToHex(toRgb(hsl));
	}

}

export namespace hwb {

	/**
	 * Converts given hwb values into rgb values.
	 * 
	 * @param param0 The hwb values in the form of [h, w, b] array.
	 */
	export function toRgb ([h, w, b]: number[]): number[] {
		return hsl.toRgb([h, 100, 50]).map(v => v * (100 - w - b) / 100 + w) as number[];
	}
	
	/**
	 * Converts given hwb values into formatted hex string.
	 * 
	 * @param hsl The hwb values in the form of [h, w, b] array.
	 */
	export function toHex (hwb_: number[]): number[] {
		return rgb.toHwb(hwb.toRgb(hwb_));
	}

}

export namespace cmyk {
	
	/**
	 * Converts a given cmyk array intro rgb values in the form of [r, g, b] array.
	 * 
	 * @param param0 The cmyk values in the form of [c, m, y, k] array.
	 * @example 
	 * cmyk.toRgb([0, 0, 0, 0]); // [255, 255, 255]
	 */
	export function toRgb ([c, m, y, k]: number[]): number[] {
		c /= 100, m /= 100, y /= 100, k /= 100;
	
		let x = 1 - k;
		let f = n => fixedFloat((1 - (n * x + k)) * 255);
	
		return [f(c), f(m), f(y)];
	}
	
	/**
	 * Converts given cmyk values into formatted hex string.
	 * 
	 * @param hsl The cmyk values in the form of [c, m, y, k] array.
	 * @example
	 * cmyk.toHex([0, 0, 0, 0]); // '#ffffff'
	 */
	export function toHex (hsl_: number[]): number[] {
		return rgb.toCmyk(hsl.toRgb(hsl_));
	}

}

export namespace xyz {

	/**
	 * Converts xyz values into rgb in the form of [r, g, b] array.
	 * 
	 * @param param0 The xyz values in the form of [x, y, z] array.
	 * @example
	 * xyz.toRgb([95.047, 100.00001, 108.883]); // [255, 255, 255]
	 */
	export function toRgb ([x, y, z]: number[]): number[] {
		x /= 100, y /= 100, z /= 100;

		let f = n => {
			n = n > 0.0031308
				? ((1.055 * (n ** (1.0 / 2.4))) - 0.055)
				: n * 12.92;

			return fixedFloat(Math.min(Math.max(0, n), 1) * 255);
		};
		
		return [
			f((x * 3.2404542) + (y * -1.5371385) + (z * -0.4985314)),
			f((x * -0.969266) + (y * 1.8760108) + (z * 0.041556)),
			f((x * 0.0556434) + (y * -0.2040259) + (z * 1.0572252))
		]
	}

	/**
	 * Converts xyz values into lab values in the form of [l, a, b] array.
	 * The values are not rounded when returned by the function.
	 * 
	 * @param param0 The xyz values in the form of [x, y, z] array.
	 */
	export function toLab ([x, y, z]: number[]): number[] {
		let f = n => n > 0.008856 ? (n ** (1 / 3)) : (7.787 * n) + (16 / 116);
		x = f(x / 95.047), y =  f(y / 100), z = f(z / 108.883);
		return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
	}

}

export namespace lab {

	/**
	 * Converts lab values into rgb values in the form of [l, a, b] array.
	 * 
	 * @param lab The lab values in the form of [l, a, b] array.
	 */
	export function toRgb (lab: number[]): number[] {
		return xyz.toRgb(toXyz(lab));
	}

	/**
	 * Converts lab values into xyz values in the form of [x, y, z] array.
	 * The values returned are not rounded.
	 * 
	 * @param param0 The lab values in the form of [l, a, b] array.
	 */
	export function toXyz ([l, a, b]: number[]): number[] {
		let y = (l + 16) / 116;
		let x = a / 500 + y;
		let	z = y - b / 200;
		let f = n => {
			let n2 = n ** 3;
			return n2 > 0.008856 ? n2 : (n - 16 / 116) / 7.787;
		}
	
		return [f(x) * 95.047, f(y) * 100, f(z) * 108.883];
	}

	/**
	 * Converts lab values into lch values in the form of [l, c, h] array.
	 * 
	 * @param param0 The lab values in the form of [l, a, b] array.
	 */
	export function toLch ([l, a, b]: number[]): number[] {
		let	h = Math.atan2(b, a) * 360 / 2 / Math.PI;
		if (h < 0) h += 360;
		
		return [l, Math.sqrt(a * a + b * b), h];
	}

}

export namespace lch {

	/**
	 * Converts lch values into lab values in the form of [l, a, b] array.
	 * 
	 * @param param0 The lch values in the form of [l, c, h] array.
	 */
	export function toLab ([l, c, h]: number[]): number[] {
		let hr = h / 360 * 2 * Math.PI;
		return [l, c * Math.cos(hr), c * Math.sin(hr)];
	}

}

export namespace ansi16 {

	/**
	 * Converts an ansi16 code to rgb values.
	 * 
	 * @param n The ansi16 code.
	 * @example
	 * ansi16.toRgb(91); // [255, 0, 0]
	 */
	export function toRgb (n: number): number[] {
		let color = n % 10;
		
		if (color === 0 || color === 7) {
			if (n > 50) color += 3.5;
			color /=  10.5 * 255;
			return [color, color, color];
		}
		
		let mult = (~~(n > 50) + 1) * 0.5;

		return [
			fixedFloat(((color & 1) * mult) * 255),
			fixedFloat((((color >> 1) & 1) * mult) * 255),
			fixedFloat((((color >> 2) & 1) * mult) * 255)
		];
	}

}

export namespace ansi256 {

	/**
	 * Converts an ansi256 code to rgb values.
	 * 
	 * @param n The ansi256 code.
	 * @example
	 * ansi256.toRgb(196); // [255, 0, 0]
	 */
	export function toRgb (n: number): number[] {
		if (n >= 232) {
			let color = (n - 232) * 10 + 8;
			return [color, color, color];
		}

		n -= 16;
		let rem = n % 36;
	
		return [
			fixedFloat(Math.floor(n / 36) / 5 * 255),
			fixedFloat(Math.floor(rem / 6) / 5 * 255),
			fixedFloat((rem % 6) / 5 * 255)
		];
	}
	
}

export namespace gray {

	/**
	 * Converts grayscale percentage to rgb values in the form of [r, g, b] array.
	 * 
	 * @param gray The grayscale percentage
	 * @example 
	 * gray.toRgb(100); // [255, 255, 255]
	 */
	export function toRgb (gray: number): number[] {
		let x = fixedFloat(gray / 100 * 255);
		return [x, x, x];
	}
}