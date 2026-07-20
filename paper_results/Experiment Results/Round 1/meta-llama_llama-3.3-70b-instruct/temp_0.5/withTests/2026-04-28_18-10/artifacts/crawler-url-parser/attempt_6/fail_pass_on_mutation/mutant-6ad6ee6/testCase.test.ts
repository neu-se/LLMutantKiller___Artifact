import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = 'http://example.com/path#abc';
        const expectedUrl = 'http://example.com/path';
        const result = parse(url);
        expect(result.url).toBe(expectedUrl);
    });

    it('should fail to parse URL with fragment when using mutated code', () => {
        const url = 'http://example.com/path#abc';
        const expectedUrl = 'http://example.com/pathbc'; // This should fail with mutated code
        const result = parse(url);
        expect(result.url).not.toBe(expectedUrl);
    });
});