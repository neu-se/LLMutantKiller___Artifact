import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with removeQueryParameters', () => {
    it('should pass on the original code and fail on the mutated code', () => {
        const url = 'https://example.com/path?a=1&b=2&utmy=facebook';
        const result = parse(url);
        if (result) {
            expect(result.search).toContain('a=1');
            expect(result.search).toContain('b=2');
            expect(result.search).toContain('utmy=facebook');
        } else {
            expect(result).toBeNull();
        }
    });
});