import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = 'http://example.com/path#a';
        const expectedUrl = 'http://example.com/path';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });
});