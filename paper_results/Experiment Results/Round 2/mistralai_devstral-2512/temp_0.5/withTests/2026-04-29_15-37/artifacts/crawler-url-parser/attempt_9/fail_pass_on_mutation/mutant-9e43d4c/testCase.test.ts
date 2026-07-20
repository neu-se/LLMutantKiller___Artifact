// test/parse-url-with-relative-and-query.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with query parameters', () => {
    it('should correctly parse relative URLs with query parameters when base URL is provided', () => {
        const result = parse("?query=value", "http://example.com/path");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?query=value");
        expect(result!.search).toBe("?query=value");
        expect(result!.querycount).toBe(1);
    });
});