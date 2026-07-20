// test/parse-url-with-relative-path.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with relative path', () => {
    it('should correctly resolve relative paths with query parameters', () => {
        const result = parse("../../../path?query=value", "http://example.com/a/b/c/d");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?query=value");
        expect(result!.path).toBe("/path");
        expect(result!.search).toBe("?query=value");
        expect(result!.querycount).toBe(1);
    });
});