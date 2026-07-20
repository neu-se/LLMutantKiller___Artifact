import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function with removeQueryParameters', () => {
    it('should remove query parameters that match the given regex or string', () => {
        const url = 'https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc';
        const result = parse(url);
        if (result) {
            expect(result.search).toContain('a=1');
            expect(result.search).toContain('b=2');
            expect(result.search).not.toContain('utm_source');
            expect(result.search).not.toContain('utm_medium');
        } else {
            expect(result).toBeNull();
        }
    });
});