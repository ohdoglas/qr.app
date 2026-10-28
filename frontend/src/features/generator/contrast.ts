function channelToLinear(value: number): number {
    const normalized = value / 255;
    return normalized <= 0.04045
        ? normalized / 12.92
        : ((normalized + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(hexColor: string): number {
    const channels = hexColor.match(/[\da-f]{2}/gi);
    if (!channels || channels.length !== 3) return 0;

    const [red, green, blue] = channels.map((channel) => channelToLinear(parseInt(channel, 16)));
    return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getContrastRatio(foreground: string, background: string): number {
    const first = relativeLuminance(foreground);
    const second = relativeLuminance(background);
    const lighter = Math.max(first, second);
    const darker = Math.min(first, second);
    return (lighter + 0.05) / (darker + 0.05);
}

export function isReadableQrColorPair(foreground: string, background: string): boolean {
    return relativeLuminance(foreground) < relativeLuminance(background)
        && getContrastRatio(foreground, background) >= 4.5;
}
