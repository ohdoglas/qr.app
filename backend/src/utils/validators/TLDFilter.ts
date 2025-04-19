const TLDBlackList = [
    ".ru", ".tk", ".ml", ".gq", ".cf", ".xyz", ".zip", ".mov"
];

export default function TLDFilter(url: string) {
    try {
        for (let index = 0; index < TLDBlackList.length; index++) {
            const element = TLDBlackList[index];
            if (url.endsWith(element)) {
                return true;
            }
        }

        return false;

    } catch (error) {
        console.error(error);
        throw new Error(`Error while TLD Filter ${error}`);
    }
}
