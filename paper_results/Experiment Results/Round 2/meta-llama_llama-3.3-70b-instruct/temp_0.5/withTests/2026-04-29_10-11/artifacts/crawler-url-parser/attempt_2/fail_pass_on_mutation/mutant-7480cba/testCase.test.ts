import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs without protocol', () => {
        const url = 'www.example.com';
        const resultOriginal = parse(url);
        expect(resultOriginal.url).toBe('http://www.example.com/');
    });
});