// test/parse-url-with-special-chars.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with special characters', () => {
    it('should correctly parse URLs with encoded characters in query string', () => {
        const result = parse("http://example.com/path?param=%20value%20");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?param=%20value%20");
        expect(result!.search).toBe("?param=%20value%20");
        expect(result!.querycount).toBe(1);
    });
});