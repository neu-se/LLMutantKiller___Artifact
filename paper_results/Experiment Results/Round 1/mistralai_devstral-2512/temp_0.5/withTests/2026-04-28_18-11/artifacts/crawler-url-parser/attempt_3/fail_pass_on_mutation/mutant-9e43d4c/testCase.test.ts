// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL containing hash fragment', () => {
    it('should correctly parse URLs with hash fragments when base URL is provided', () => {
        const result = parse("path#section", "http://example.com/base");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://example.com/path");
            expect(result.search).toBeNull();
        }
    });
});