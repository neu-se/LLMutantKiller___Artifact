import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const htmlString = '<html><body><a href="/test">Test</a></body></html>';
        const result = extract(htmlString, 'https://www.example.com');
        expect(result).toBeDefined();
        expect(result[0].url).toBe('https://www.example.com/test');
        expect(result[0].text).toBe('Test');
        expect(Object.prototype.toString.call(result[0])).toBe('[object Object]');
    });
});