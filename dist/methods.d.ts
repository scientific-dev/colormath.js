import { ColorValue, ColorResult } from "./utils";
/**
 * Returns the inverted color of the provided color value.
 *
 * @param color The [r, g, b] array or hex string.
 */
export declare function invert(color: ColorValue): ColorResult;
/**
 * Rotates the hue variable by provided degree.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The degree the hue variable to be rotated. Value ranges from 0 to 360. Default value is 30.
 */
export declare function hue(color: ColorValue, value?: number): ColorResult;
/**
 * Returns the complementary color of the provided color.
 *
 * @param color The [r, g, b] array or hex string.
 */
export declare function complement(color: ColorValue): ColorResult;
/**
 * Saturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The saturation amount. Value ranges from 0.0 to 1.0. Default value is 0.5.
 */
export declare function saturate(color: ColorValue, value?: number): ColorResult;
/**
 * Desaturates a color.
 *
 * @param color The [r, g, b] array or hex string.
 * @param value The desaturation amount. Value ranges from 0.0 to 1.0. Default value is 0.5.
 */
export declare function desaturate(color: ColorValue, value?: number): ColorResult;
/**
 * Converts a color into grayscale.
 *
 * @param color The [r, g, b] array or hex string.
 */
export declare function grayscale(color: ColorValue): ColorResult;
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
export declare function mixColor(colorA: ColorValue, colorB: ColorValue, amount?: number): ColorResult;
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
export declare function lighten(color: ColorValue, amount?: number): ColorResult;
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
export declare function darken(color: ColorValue, amount?: number): ColorResult;
