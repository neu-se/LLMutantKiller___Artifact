import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url', () => {
    it('should parse url correctly', () => {
        const htmlString = '<html><body><a href="/test">Test</a></body></html>';
        const result = extract(htmlString, 'https://www.example.com');
        expect(result).toBeDefined();
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('https://www.example.com/test');
    });
});