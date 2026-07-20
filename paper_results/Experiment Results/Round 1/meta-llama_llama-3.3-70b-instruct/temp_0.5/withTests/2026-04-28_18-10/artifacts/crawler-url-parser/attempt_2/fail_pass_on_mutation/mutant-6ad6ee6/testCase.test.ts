import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = 'http://example.com/path#abcde';
        const expectedUrl = 'http://example.com/path';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it('should incorrectly parse URL with fragment when using mutated code', () => {
        const url = 'http://example.com/path#abcde';
        const expectedUrl = 'http://example.com/pathbcde';
        const result = parse(url);
        expect(result.url).not.toBe(expectedUrl);
    });
});