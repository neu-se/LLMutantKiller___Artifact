import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should remove query parameters utm_source, utm_medium, and utm_campaign', () => {
        const result = parse('http://www.google.com?utm_source=google&utm_medium=cpc&utm_campaign=test');
        expect(result.url).toBe('http://www.google.com');
    });
});