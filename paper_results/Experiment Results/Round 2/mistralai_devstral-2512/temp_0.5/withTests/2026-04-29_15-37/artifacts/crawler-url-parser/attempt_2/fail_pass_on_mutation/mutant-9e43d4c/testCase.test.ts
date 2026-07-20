// test/parse-url-with-query-string.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with query string', () => {
    it('should correctly parse URL with query parameters containing special characters', () => {
        const result = parse("http://example.com/path?param1=value1&param2=value2");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?param1=value1&param2=value2");
        expect(result!.search).toBe("?param1=value1&param2=value2");
        expect(result!.querycount).toBe(2);
    });
});