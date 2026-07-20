// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with relative URL containing query parameters', () => {
    it('should correctly resolve relative URLs with query parameters against base URL', () => {
        const result = parse("subpath?q1=value1&q2=value2", "http://example.com/base/path/");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://example.com/base/subpath?q1=value1&q2=value2");
            expect(result.path).toBe("/base/subpath");
            expect(result.search).toBe("?q1=value1&q2=value2");
            expect(result.querycount).toBe(2);
        }
    });
});