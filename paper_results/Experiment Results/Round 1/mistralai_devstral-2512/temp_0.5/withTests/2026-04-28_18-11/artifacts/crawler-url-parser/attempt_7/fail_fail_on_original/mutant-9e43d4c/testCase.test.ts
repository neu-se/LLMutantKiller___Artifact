// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with relative URL containing auth-like syntax', () => {
    it('should correctly handle relative URLs with colon in path segment', () => {
        const result = parse("user:pass@path", "http://example.com/base/");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://example.com/base/user:pass@path");
            expect(result.path).toBe("/base/user:pass@path");
        }
    });
});