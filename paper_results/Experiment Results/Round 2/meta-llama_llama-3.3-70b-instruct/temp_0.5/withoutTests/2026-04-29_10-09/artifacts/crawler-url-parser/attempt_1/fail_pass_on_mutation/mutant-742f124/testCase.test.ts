import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs with fragments', () => {
        const url = 'https://www.example.com/path#fragment';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path');
    });
});