// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL containing auth and query parameters', () => {
    it('should correctly parse URLs with authentication and query parameters', () => {
        const result = parse("http://user:pass@example.com/path?q1=value1&q2=value2");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toContain("example.com/path");
            expect(result.search).toBe("?q1=value1&q2=value2");
            expect(result.querycount).toBe(2);
        }
    });
});