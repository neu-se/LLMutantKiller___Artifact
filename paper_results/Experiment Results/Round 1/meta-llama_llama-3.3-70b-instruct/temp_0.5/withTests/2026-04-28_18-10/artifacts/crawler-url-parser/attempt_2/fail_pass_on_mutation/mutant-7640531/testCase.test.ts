import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URL with fragment', () => {
        const url = "http://example.com/path#fragment";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path");
    });

    it('should correctly parse URL with fragment and query', () => {
        const url = "http://example.com/path?a=1#fragment";
        const result = parse(url);
        expect(result.url).toBe("http://example.com/path?a=1");
    });

    it('should parse URL with only a fragment', () => {
        const url = "#fragment";
        const result = parse(url, "http://example.com");
        expect(result.url).toBe("http://example.com/");
    });
});