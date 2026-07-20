import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should correctly parse relative URLs with query parameters', () => {
        const baseUrlStr = 'http://www.example.com/path?a=1&b=2';
        const currentUrlStr = '../relative/path?c=3&d=4';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result.query).toBeDefined();
        expect(result.query).toHaveProperty('a');
        expect(result.query).toHaveProperty('b');
        expect(result.query).toHaveProperty('c');
        expect(result.query).toHaveProperty('d');
    });
});