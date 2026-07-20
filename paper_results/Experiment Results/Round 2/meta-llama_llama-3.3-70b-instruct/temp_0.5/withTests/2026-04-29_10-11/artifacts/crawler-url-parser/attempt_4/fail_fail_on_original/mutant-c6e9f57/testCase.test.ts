import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should remove utm parameters', () => {
        const result = parse('http://www.google.com/aaa?utm_source=google&utm_medium=cpc&utm_campaign=test');
        expect(result.url).toBe('http://www.google.com/aaa');
    });

    it('should remove ref parameter', () => {
        const result = parse('http://www.google.com/aaa?ref=test');
        expect(result.url).toBe('http://www.google.com/aaa');
    });
});