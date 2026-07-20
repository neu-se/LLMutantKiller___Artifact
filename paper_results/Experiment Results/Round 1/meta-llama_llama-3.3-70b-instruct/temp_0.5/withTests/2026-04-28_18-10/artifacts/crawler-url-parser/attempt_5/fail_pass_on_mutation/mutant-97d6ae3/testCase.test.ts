import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should handle currentUrl correctly when currentUrl.url is null', () => {
        const htmlString = '<a href="">Empty</a>';
        const baseUrl = 'http://www.example.com';
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(0);
    });
});