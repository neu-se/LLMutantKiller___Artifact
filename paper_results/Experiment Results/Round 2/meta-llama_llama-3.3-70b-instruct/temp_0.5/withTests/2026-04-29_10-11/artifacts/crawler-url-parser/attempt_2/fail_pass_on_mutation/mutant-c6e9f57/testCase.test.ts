import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should remove default subdomain', () => {
        const result = parse('http://www.google.com');
        expect(result.url).toBe('http://www.google.com/');
    });

    it('should not remove non-default subdomain', () => {
        const result = parse('http://mail.google.com');
        expect(result.url).toBe('http://mail.google.com/');
    });

    it('should remove default subdomain with path', () => {
        const result = parse('http://www.google.com/aaa');
        expect(result.url).toBe('http://www.google.com/aaa');
    });

    it('should not remove non-default subdomain with path', () => {
        const result = parse('http://mail.google.com/aaa');
        expect(result.url).toBe('http://mail.google.com/aaa');
    });
});