import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should normalize trailing slash', () => {
        const result = parse('http://www.google.com/aaa');
        expect(result.url).toBe('http://www.google.com/aaa');
    });

    it('should normalize trailing slash with query', () => {
        const result = parse('http://www.google.com/aaa/?query=test');
        expect(result.url).toBe('http://www.google.com/aaa/?query=test');
    });
});