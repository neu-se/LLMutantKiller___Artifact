import { parse } from './crawler-url-parser.js';

describe('parse function', () => {
    it('should correctly parse relative URLs with query parameters', () => {
        const baseUrlStr = 'http://www.example.com/path?a=1&b=2';
        const currentUrlStr = '../relative/path?c=3&d=4';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result).not.toBeNull();
        expect(result.query).toBeDefined();
        const queryKeys = Object.keys(result.query);
        expect(queryKeys.length).toBe(4);
        expect(queryKeys).toContain('a');
        expect(queryKeys).toContain('b');
        expect(queryKeys).toContain('c');
        expect(queryKeys).toContain('d');
    });
});