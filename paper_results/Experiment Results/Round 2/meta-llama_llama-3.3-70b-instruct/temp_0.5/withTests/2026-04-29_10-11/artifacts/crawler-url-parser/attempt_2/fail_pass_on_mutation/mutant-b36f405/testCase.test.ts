import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
    it('should correctly parse URL with utm parameters', () => {
        const url = 'https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc';
        const result = parse(url);
        expect(result.url).toBe('https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc');
    });

    it.skip('should correctly parse URL with utm parameters and ref', () => {
        const url = 'https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc&ref=123';
        const result = parse(url);
        expect(result.url).toBe('https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc');
    });
});