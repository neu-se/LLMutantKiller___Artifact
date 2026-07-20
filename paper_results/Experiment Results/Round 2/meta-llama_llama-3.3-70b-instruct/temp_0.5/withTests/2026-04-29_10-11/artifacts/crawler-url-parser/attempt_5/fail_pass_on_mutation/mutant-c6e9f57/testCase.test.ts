import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it.skip('should strip www subdomain', () => {
        const result = parse('http://www.google.com');
        expect(result.url).toBe('http://google.com/');
    });

    it('should not strip non-www subdomain', () => {
        const result = parse('http://mail.google.com');
        expect(result.url).toBe('http://mail.google.com/');
    });
});