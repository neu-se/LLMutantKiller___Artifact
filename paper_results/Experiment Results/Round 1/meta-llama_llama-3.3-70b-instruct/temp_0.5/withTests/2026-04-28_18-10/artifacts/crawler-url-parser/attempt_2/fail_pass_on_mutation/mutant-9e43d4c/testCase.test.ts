import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse url correctly with query parameters', () => {
        const url = 'http://www.google.com/aaa/bbb/ccc?a=1&b=2#fragment';
        const result = parse(url);
        expect(result.url).toBe('http://www.google.com/aaa/bbb/ccc?a=1&b=2');
    });
});