// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL containing special characters in path', () => {
    it('should correctly handle URLs with special characters in path when base URL is provided', () => {
        const result = parse("path/with spaces?q=test", "http://example.com");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://example.com/path/with%20spaces?q=test");
            expect(result.path).toBe("/path/with spaces");
            expect(result.search).toBe("?q=test");
        }
    });
});