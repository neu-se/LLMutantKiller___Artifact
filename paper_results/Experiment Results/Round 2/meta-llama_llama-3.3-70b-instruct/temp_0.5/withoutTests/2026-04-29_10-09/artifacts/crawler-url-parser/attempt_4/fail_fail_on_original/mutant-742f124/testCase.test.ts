import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs with fragments', () => {
        const url = 'https://www.example.com/path#fragment';
        const result = parse(url);
        if (result === null) {
            throw new Error('parse function returned null');
        }
        expect(result.url).toBe('https://www.example.com/path');
        expect(result.search).toBe('');
    });
});