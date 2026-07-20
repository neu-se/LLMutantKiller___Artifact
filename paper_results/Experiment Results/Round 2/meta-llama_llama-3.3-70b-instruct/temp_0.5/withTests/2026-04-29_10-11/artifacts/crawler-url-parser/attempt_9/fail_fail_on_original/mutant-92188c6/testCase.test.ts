import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&b=2&c=3&a=4#hash';
        const result = parse(url);
        if (result === null) {
            throw new Error('Result is null');
        }
        const urlObject = new URL(result.url);
        expect(urlObject.searchParams.get('a')).toBe('4');
    });
});