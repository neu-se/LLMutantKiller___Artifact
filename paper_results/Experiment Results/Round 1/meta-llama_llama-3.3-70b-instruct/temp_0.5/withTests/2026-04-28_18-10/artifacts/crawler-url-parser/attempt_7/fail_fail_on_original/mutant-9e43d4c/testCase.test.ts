import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse URL with URL as fragment', () => {
        const url = 'http://example.com#http://example.com/path';
        const result = parse(url);
        expect(result.url).toBe('http://example.com');
    });
});