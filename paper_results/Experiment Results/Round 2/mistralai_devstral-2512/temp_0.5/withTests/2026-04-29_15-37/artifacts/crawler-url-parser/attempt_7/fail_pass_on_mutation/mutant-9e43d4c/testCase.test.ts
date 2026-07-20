// test/parse-url-with-hash.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with hash and query', () => {
    it('should correctly parse URL with hash and query parameters', () => {
        const result = parse("http://example.com/path?query=value#hash");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?query=value");
        expect(result!.search).toBe("?query=value");
        expect(result!.querycount).toBe(1);
    });
});