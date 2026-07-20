import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse a URL with query parameters', () => {
        const url = "https://www.example.com/path?utm_source=google&ref=abc";
        const result = parse(url);
        expect(result).not.toBeNull();
        expect(result.search).toContain('ref');
        expect(result.querycount).toBe(1);
    });
});