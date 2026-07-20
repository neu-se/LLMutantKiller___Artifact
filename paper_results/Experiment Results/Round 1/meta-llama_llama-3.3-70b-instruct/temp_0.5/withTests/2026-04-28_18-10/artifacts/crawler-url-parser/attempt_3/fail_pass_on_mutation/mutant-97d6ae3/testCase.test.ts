import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it.skip('should handle currentUrl correctly', () => {
        const htmlString = '<a href="http://www.example.com">Example</a>';
        const baseUrl = 'http://www.example.com';
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('http://www.example.com');
    });

    it('should handle null currentUrl', () => {
        const htmlString = '<a href="">Empty</a>';
        const baseUrl = 'http://www.example.com';
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(0);
    });

    it('should handle currentUrl with null url', () => {
        const htmlString = '<a href="">Empty</a>';
        const baseUrl = 'http://www.example.com';
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(0);
    });
});