import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse URL correctly', () => {
        const url = 'http://example.com/path#abcde';
        const result = parse(url);
        expect(result.url).toBe('http://example.com/path');
    });

    it('should fail on mutated code', () => {
        const url = 'http://example.com/path#abcde';
        const result = parse(url);
        expect(result.url).not.toBe('http://example.com/pathe');
    });
});