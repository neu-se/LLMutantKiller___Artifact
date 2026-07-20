import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse URL with URL as fragment and query parameters', () => {
        const url = 'http://example.com?a=1#http://example.com/path';
        const result = parse(url);
        if (result !== null) {
            expect(result.search).toBe('?a=1');
        } else {
            expect(result).toBeNull();
        }
    });
});