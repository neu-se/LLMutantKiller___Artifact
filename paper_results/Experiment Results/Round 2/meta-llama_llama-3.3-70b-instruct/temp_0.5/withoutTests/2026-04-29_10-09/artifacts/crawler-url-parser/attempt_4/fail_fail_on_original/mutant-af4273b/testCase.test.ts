import { parse } from '../crawler-url-parser';

describe('parse function', () => {
    it('should correctly parse relative URLs with query parameters', () => {
        const baseUrlStr = 'http://www.example.com/path?a=1&b=2';
        const currentUrlStr = '../relative/path?c=3&d=4';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result).not.toBeNull();
        expect(result.url).toBe('http://www.example.com/relative/path?c=3&d=4');
        expect(result.baseurl).toBe('http://www.example.com/path');
        expect(result.protocol).toBe('http:');
        expect(result.host).toBe('www.example.com');
        expect(result.domain).toBe('example.com');
        expect(result.subdomain).toBe('www');
        expect(result.path).toBe('/relative/path');
        expect(result.search).toBe('?c=3&d=4');
        expect(result.querycount).toBe(2);
    });
});