import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with removeQueryParameters option', () => {
    it('should remove utm query parameters and ref query parameter', () => {
        const url = 'https://www.example.com/path?a=1&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });

    it('should not remove non-utm query parameters when there are no utm parameters', () => {
        const url = 'https://www.example.com/path?a=1&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });

    it('should remove utm query parameters when there are multiple utm parameters and a ref parameter', () => {
        const url = 'https://www.example.com/path?a=1&utm_source=google&utm_medium=cpc&utm_campaign=spring_sale&utm_content=sale&utm_term=summer&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://www.example.com/path?a=1');
    });
});