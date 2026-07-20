import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should normalize https protocol', () => {
        const result = parse('http://www.google.com');
        expect(result.protocol).toBe('http:');
    });

    it('should normalize protocol', () => {
        const result = parse('https://www.google.com');
        expect(result.protocol).toBe('https:');
    });
});