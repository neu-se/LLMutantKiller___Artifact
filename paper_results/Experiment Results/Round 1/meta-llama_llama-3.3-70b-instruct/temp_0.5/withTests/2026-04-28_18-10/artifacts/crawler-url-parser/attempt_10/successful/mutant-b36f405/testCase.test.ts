import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with removeQueryParameters option', () => {
    it('should remove utm query parameters and fail on mutant due to \W', () => {
        const url = 'https://www.example.com/path?a=1&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });

    it('should not remove non-utm query parameters', () => {
        const url = 'https://www.example.com/path?a=1&b=2';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1&b=2');
    });

    it('should remove ref query parameter and fail on mutant due to \W', () => {
        const url = 'https://www.example.com/path?a=1&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });
});