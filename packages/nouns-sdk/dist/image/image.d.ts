import { ImageBounds, ImageRows, RGBAColor } from './types';
/**
 * A class used to convert an image into the following RLE format:
 * Palette Index, Bounds [Top (Y), Right (X), Bottom (Y), Left (X)] (4 Bytes), [Pixel Length (1 Byte), Color Index (1 Byte)][].
 */
export declare class Image {
    private _width;
    private _height;
    private _rows;
    private _bounds;
    private _rle;
    /**
     * The image's pixel width
     */
    get width(): number;
    /**
     * The image's pixel height
     */
    get height(): number;
    /**
     * The number of rows to run-length encode
     */
    get rows(): ImageRows;
    /**
     * The bounds of the inner rect to run-length encode
     */
    get bounds(): ImageBounds;
    constructor(width: number, height: number);
    /**
     * Convert an image to a run-length encoded string using the provided RGBA
     * and color palette values.
     * @param getRgbaAt A function used to fetch the RGBA values at specific x-y coordinates
     * @param colors The color palette map
     */
    toRLE(getRgbaAt: (x: number, y: number) => RGBAColor, colors: Map<string, number>): string;
    /**
     * Using the image pixel inforation, run-length encode an image.
     * @param getRgbaAt A function used to fetch the RGBA values at specific x-y coordinates
     * @param colors The color palette map
     */
    private encode;
    /**
     * Append a single pixel to a new or existing rect
     * @param colorIndex The color array index
     * @param y The current `y` coordinate
     */
    private appendPixelToRect;
    /**
     * Update the bounds of the provided image
     * @param y The current `y` coordinate
     */
    private updateImageBounds;
    /**
     * Delete all empty rows. That is, all rows above the top bound or
     * below the lower bound
     */
    private deleteEmptyRows;
    /**
     * Get the encoded part bounds string
     * @param bounds The part bounds
     */
    private getEncodedBounds;
    /**
     * Get a single row encoded as a hex string
     * @param row The row data
     * @param bounds The image bounds
     */
    private getEncodedRow;
    /**
     * Determine if the provided rect fills the entire row and is transparent
     * @param rect The rect to inspect
     */
    private isEmptyRow;
}
