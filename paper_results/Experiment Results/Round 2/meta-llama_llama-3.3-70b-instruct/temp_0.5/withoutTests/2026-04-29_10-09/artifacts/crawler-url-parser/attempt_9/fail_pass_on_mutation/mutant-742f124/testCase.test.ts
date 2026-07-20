import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs with fragments', () => {
        const url = 'https://www.example.com/path#fragment';
        const resultOriginal = parse(url);
        if (resultOriginal === null) {
            throw new Error('parse function returned null');
        }
        expect(resultOriginal.url).toBe('https://www.example.com/path');
        const urlWithFragment = 'https://www.example.com/path#fragment';
        const result = parse(urlWithFragment);
        if (result === null) {
            throw new Error('parse function returned null');
        }
        expect(result.url).not.toContain('#fragment');
    });
});