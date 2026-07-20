import { parse } from '../../crawler-url-parser';

describe('parse function', () => {
    it('should correctly parse relative URLs with query parameters', () => {
        const baseUrlStr = 'http://www.example.com/path?a=1&b=2';
        const currentUrlStr = '../relative/path?c=3&d=4';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result).not.toBeNull();
        expect(result.query).toBeDefined();
        expect(result.query).toHaveProperty('a', ['1']);
        expect(result.query).toHaveProperty('b', ['2']);
        expect(result.query).toHaveProperty('c', ['3']);
        expect(result.query).toHaveProperty('d', ['4']);
    });
});