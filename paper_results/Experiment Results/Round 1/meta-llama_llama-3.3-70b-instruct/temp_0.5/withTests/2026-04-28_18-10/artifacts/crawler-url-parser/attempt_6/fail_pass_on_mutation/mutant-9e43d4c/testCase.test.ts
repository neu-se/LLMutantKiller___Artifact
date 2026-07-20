import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should handle URL with duplicate query parameters', () => {
        const url = 'http://www.google.com/aaa/bbb/ccc?a=1&a=2#fragment';
        const result = parse(url);
        expect(result.search).toBe('?a=1&a=2');
    });
});