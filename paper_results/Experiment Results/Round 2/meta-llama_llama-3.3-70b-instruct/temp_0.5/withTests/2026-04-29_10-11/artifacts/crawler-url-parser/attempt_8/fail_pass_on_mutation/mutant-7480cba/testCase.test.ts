import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs starting with a single character followed by a colon', () => {
        const url = 'x.example.com';
        const result = parse(url);
        expect(result.url).toBe('http://x.example.com/');
    });
});