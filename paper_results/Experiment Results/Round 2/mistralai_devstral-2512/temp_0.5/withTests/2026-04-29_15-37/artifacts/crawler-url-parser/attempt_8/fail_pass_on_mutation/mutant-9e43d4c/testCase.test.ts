// test/parse-url-with-multiple-queries.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with multiple query parameters', () => {
    it('should correctly count multiple query parameters with same name', () => {
        const result = parse("http://example.com/path?param=value1&param=value2&param=value3");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?param=value1&param=value2&param=value3");
        expect(result!.querycount).toBe(3);
    });
});