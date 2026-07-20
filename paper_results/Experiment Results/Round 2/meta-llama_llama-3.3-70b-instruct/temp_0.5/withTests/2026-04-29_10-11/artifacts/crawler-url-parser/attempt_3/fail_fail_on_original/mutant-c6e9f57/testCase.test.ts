import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
    it('should remove trailing slash and directory index', () => {
        const result = parse('http://www.google.com/aaa/index.html');
        expect(result.url).toBe('http://www.google.com/aaa');
    });

    it('should remove trailing slash', () => {
        const result = parse('http://www.google.com/aaa/');
        expect(result.url).toBe('http://www.google.com/aaa');
    });

    it('should remove directory index', () => {
        const result = parse('http://www.google.com/aaa/index.html');
        expect(result.url).toBe('http://www.google.com/aaa');
    });
});