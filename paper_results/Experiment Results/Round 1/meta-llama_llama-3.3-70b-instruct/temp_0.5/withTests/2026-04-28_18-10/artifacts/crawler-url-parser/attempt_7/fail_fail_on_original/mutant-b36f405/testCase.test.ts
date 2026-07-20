import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with removeQueryParameters option', () => {
    it('should fail to remove utm query parameters with non-word boundary in mutant', () => {
        const url = 'https://www.example.com/path?a=1&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale&utmx=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1&utmx=123');
    });

    it('should remove utm query parameters with word boundary', () => {
        const url = 'https://www.example.com/path?a=1&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });

    it('should remove ref query parameter', () => {
        const url = 'https://www.example.com/path?a=1&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });
});