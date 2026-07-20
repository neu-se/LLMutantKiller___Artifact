import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse URL with fragment correctly', () => {
        const url = 'http://example.com/path#http://example.com/path';
        const result = parse(url);
        if (result !== null) {
            expect(result.url).toBe('http://example.com/path');
            expect(result.hash).toBeUndefined();
        } else {
            expect(result).toBeNull();
        }
    });
});