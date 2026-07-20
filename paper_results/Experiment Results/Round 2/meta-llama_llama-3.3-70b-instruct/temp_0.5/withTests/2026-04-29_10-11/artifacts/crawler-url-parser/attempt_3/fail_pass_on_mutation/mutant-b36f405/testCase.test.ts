import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
    it('should correctly parse URL with utm parameters and not remove them when the regex is incorrect', () => {
        const url = 'https://example.com/path?a=1&b=2&utm_source=google&utm_medium=cpc';
        const result = parse(url);
        expect(result.url).not.toBe('https://example.com/path?a=1&b=2&utm_source=googl&utm_medium=cpc');
    });
});