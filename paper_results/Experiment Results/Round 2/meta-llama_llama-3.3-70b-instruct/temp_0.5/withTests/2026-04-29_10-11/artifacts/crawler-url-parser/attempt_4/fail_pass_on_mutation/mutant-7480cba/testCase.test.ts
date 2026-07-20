import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs starting with "w:"', () => {
        const url = 'w.example.com';
        const result = parse(url);
        expect(result.url).toBe('http://w.example.com/');
    });
});