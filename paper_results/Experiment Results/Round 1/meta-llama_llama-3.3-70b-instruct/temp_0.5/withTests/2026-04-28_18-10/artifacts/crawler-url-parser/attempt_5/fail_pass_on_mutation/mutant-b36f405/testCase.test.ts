import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with removeQueryParameters option', () => {
    it.skip('should remove utm query parameters with word boundary', () => {
        const url = 'https://www.example.com/path?a=1&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });

    it.skip('should remove ref query parameter', () => {
        const url = 'https://www.example.com/path?a=1&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });

    it('should not remove query parameters with non-word boundary in original but should in mutant', () => {
        const url = 'https://www.example.com/path?a=1&utmx=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1&utmx=123');
    });
});