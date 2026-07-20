import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
    it('should correctly parse URL with query parameters and not remove non-utm parameters', () => {
        const url = 'https://example.com/path?a=1&b=2&c=3&utm_source=google&utm_medium=cpc&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://example.com/path?a=1&b=2&c=3&utm_source=google&utm_medium=cpc');
    });
});