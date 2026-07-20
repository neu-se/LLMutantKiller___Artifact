import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const url = 'http://example.com/path?a=1&b=2&c=3';
        const result = parse(url);
        const query = result.search.substring(1); // remove the '?' character
        const params = query.split('&');
        expect(params.length).toBe(3);
        expect(params[0]).toBe('a=1');
        expect(params[1]).toBe('b=2');
        expect(params[2]).toBe('c=3');
    });
});