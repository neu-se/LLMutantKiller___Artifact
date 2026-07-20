// test/parse-url-with-fragment.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment', () => {
    it('should correctly handle URLs with fragments and query parameters', () => {
        const result = parse("http://example.com/path?query=value#fragment");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?query=value");
        expect(result!.search).toBe("?query=value");
        expect(result!.querycount).toBe(1);
    });
});