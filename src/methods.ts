import { RGB, ColorValue, ColorResult, hexToRgb } from "./utils";
import { hsv, rgb } from "./convert";

function useHSV (
	color: ColorValue,
	fn: (hsv: number[]) => void
): ColorResult {
	let result = rgb.toHsv(typeof color == "string" ? hexToRgb(color) : color);
	fn(result);

	return new ColorResult(hsv.toRgb(result));
}

/**
 * Returns the inverted color of the provided color value.
 *
 * @param color The [r, g, b] array or hex string.
 */
export function invert (color: ColorValue): ColorResult {
	let [r, g, b] = RGB(color);
	return new ColorResult([255 - r, 255 - g, 255 - b]);
}

/**
 * Rotates the hue variable by provided degree.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The degree the hue variable to be rotated. Value ranges from 0 to 360. Default value is 30.
 */
export function hue (color: ColorValue, value = 30): ColorResult {
	if (value > 360) value %= 360;
	return useHSV(color, hsv => hsv[0] += value);
}

/**
 * Returns the complementary color of the provided color.
 *
 * @param color The [r, g, b] array or hex string.
 */
export function complement (color: ColorValue): ColorResult {
	return hue(color, 180);
}

/**
 * Saturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The saturation amount. Value ranges from 0 to 100. Default value is 20.
 */
export function saturate (color: ColorValue, value = 20): ColorResult {
	return useHSV(color, hsv => {
		let x = hsv[1] + value;
		if (x > 100) x = 100;
		else if (x < 0) x = 0;

		hsv[1] = x;
	});
}

/**
 * Desaturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The desaturation amount. Value ranges from 0 to 100. Default value is 20.
 */
export function desaturate (color: ColorValue, value = 20): ColorResult {
	return saturate(color, -value);
}

/**
 * Converts a color into grayscale.
 *
 * @param color The [r, g, b] array or hex string.
 */
export function grayscale (color: ColorValue): ColorResult {
	let [r, g, b] = RGB(color);
	let x = Math.floor((r + g + b) / 765 * 100);
	return new ColorResult([x, x, x]);
}

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
export function mixColor (colorA: ColorValue, colorB: ColorValue, amount = .5): ColorResult {
	let result: number[] = [0, 0, 0],
		rgbA = RGB(colorA),
		rgbB = RGB(colorB);

	for (let i = 0; i < 3; i++)
		result[i] = (rgbA[i] * amount) + (rgbB[i] * (1 - amount));

	return new ColorResult(result)
}

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
export function lighten (color: ColorValue, amount = 10): ColorResult {
	let result = RGB(color);
	amount *= 2.55;

	for (let i = 0; i < 3; i++) {
		result[i] += amount;

		if (result[i] > 255) result[i] = 255;
		else if (result[i] < 0) result[i] = 0;
	}

	return new ColorResult(result);
}

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
export function darken (color: ColorValue, amount = 20): ColorResult {
	return lighten(color, -amount);
}