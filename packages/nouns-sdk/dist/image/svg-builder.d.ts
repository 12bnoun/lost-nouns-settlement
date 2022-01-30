/**
 * Given RLE parts, palette colors, and a background color, build an SVG image.
 * @param parts The RLE part datas
 * @param paletteColors The hex palette colors
 * @param bgColor The hex background color
 */
export declare const buildSVG: (parts: {
    data: string;
}[], paletteColors: string[][], bgColor: string) => string;
