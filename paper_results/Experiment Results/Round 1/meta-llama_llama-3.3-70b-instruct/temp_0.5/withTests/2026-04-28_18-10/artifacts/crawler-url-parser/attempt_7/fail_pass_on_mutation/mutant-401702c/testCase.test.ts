import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly handle URLs without a protocol and with word characters', () => {
        const url = 'a.example.com';
        const result = parse(url);
        expect(result.url).toBe('http://a.example.com/');
    });
});