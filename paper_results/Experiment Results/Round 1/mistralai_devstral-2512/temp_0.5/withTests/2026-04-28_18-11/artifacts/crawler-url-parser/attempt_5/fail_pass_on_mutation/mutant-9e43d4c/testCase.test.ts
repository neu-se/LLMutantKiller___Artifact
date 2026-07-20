// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL containing special characters in query', () => {
    it('should correctly handle URLs with encoded characters in query parameters', () => {
        const result = parse("http://example.com/path?q=hello%20world&foo=bar%2Bbaz");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.search).toBe("?q=hello%20world&foo=bar%2Bbaz");
            expect(result.querycount).toBe(2);
        }
    });
});