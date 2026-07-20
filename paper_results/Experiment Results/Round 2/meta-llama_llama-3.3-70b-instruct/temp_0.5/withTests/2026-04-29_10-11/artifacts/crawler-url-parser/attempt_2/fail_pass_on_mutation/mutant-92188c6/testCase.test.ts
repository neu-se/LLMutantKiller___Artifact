import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&b=2&c=3#hash';
        const result = parse(url);
        const parsedUrl = new URL(result.url);
        expect(parsedUrl.searchParams.get('a')).toBe('1');
        expect(parsedUrl.searchParams.get('b')).toBe('2');
        expect(parsedUrl.searchParams.get('c')).toBe('3');
    });
});