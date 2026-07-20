import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse and extract urls', function () {
    it('should extract urls from html', function () {
        const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
        const baseUrl = 'https://www.example.com';
        const result = extract(html, baseUrl);
        expect(result.length).toBe(1);
        expect(result[0].url).toBe('https://www.example.com');
    });
});