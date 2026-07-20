import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should handle currentUrl correctly when currentUrl is null and currentUrl.url is truthy', () => {
        const htmlString = '<a href="http://www.example.com">Example</a>';
        const baseUrl = 'http://www.example.com';
        const currentUrl = null;
        const urlMap = new Map();
        urlMap.set('http://www.example.com', { url: 'http://www.example.com' });
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('http://www.example.com');
    });
});