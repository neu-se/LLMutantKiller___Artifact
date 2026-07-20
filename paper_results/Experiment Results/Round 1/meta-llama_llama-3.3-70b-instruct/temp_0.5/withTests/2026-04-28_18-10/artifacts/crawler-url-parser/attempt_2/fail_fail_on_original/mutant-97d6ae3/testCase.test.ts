import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
    it('should not add null urls to the result', () => {
        const htmlString = '<a href="http://www.example.com">Example</a><a href="">Empty</a>';
        const baseUrl = 'http://www.example.com';
        const result = extract(htmlString, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('http://www.example.com');
    });
});