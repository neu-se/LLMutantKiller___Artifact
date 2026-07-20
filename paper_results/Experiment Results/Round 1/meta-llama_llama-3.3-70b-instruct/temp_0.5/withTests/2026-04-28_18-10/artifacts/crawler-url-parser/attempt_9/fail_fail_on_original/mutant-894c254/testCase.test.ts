import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with removeQueryParameters', () => {
    it('should pass on the original code and fail on the mutated code', () => {
        const url = 'https://example.com/path?a=1&b=2&utm_source=facebook&ref=google';
        const result = parse(url);
        if (result) {
            expect(result.search).toContain('a=1');
            expect(result.search).toContain('b=2');
            expect(result.search).not.toContain('utm_source');
            expect(result.search).not.toContain('ref');
            expect(result.search).toHaveLength(7); // length of "?a=1&b=2"
        } else {
            expect(result).toBeNull();
        }
    });
});