// test/parse-url-with-empty-query.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with empty query parameter', () => {
    it('should correctly handle URLs with empty query values', () => {
        const result = parse("http://example.com/path?param1=&param2=value");
        expect(result).not.toBeNull();
        expect(result!.url).toBe("http://example.com/path?param1=&param2=value");
        expect(result!.search).toBe("?param1=&param2=value");
        expect(result!.querycount).toBe(2);
    });
});