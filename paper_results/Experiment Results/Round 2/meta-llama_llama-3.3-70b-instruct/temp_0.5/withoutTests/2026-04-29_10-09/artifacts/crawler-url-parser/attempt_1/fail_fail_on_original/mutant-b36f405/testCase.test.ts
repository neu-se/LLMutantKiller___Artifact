import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse a URL with query parameters', () => {
        const url = "https://www.example.com/path?a=1&utm_source=google&ref=abc";
        const result = parse(url);
        expect(result.querycount).toBe(1);
    });
});