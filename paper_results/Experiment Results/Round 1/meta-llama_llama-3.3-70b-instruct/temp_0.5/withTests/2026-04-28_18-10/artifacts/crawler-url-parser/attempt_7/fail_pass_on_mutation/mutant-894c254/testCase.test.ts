import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with removeQueryParameters', () => {
    it('should not remove query parameters that do not match the given regex or string in the original code but remove in the mutated code', () => {
        const url = 'https://example.com/path?a=1&b=2&utmx=facebook';
        const result = parse(url);
        if (result) {
            expect(result.search).toContain('a=1');
            expect(result.search).toContain('b=2');
            expect(result.search).toContain('utmx=facebook');
        } else {
            expect(result).toBeNull();
        }
    });
});