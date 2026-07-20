import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs with fragments', () => {
        const url = 'https://www.example.com/path#fragment';
        const result = parse(url);
        if (result === null) {
            throw new Error('parse function returned null');
        }
        expect(result.url).toBe('https://www.example.com/path');
        const urlWithFragment = 'https://www.example.com/path#fragment';
        const result2 = parse(urlWithFragment);
        if (result2 === null) {
            throw new Error('parse function returned null');
        }
        expect(result2.url).not.toContain('#');
    });
});