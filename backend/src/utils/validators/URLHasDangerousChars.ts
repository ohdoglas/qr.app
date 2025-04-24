
export default function hasDangerouChars(url: string): boolean {
    const regex = /[<>"'`]/;
    return regex.test(url);
}