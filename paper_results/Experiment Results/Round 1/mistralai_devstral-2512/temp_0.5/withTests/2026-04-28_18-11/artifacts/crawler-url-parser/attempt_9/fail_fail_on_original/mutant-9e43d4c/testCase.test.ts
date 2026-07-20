// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL containing auth and port', () => {
    it('should correctly parse URLs with authentication and port numbers', () => {
        const result = parse("http://user:pass@example.com:8080/path?q=test");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.host).toBe("user:pass@example.com:8080");
            expect(result.search).toBe("?q=test");
            expect(result.querycount).toBe(1);
        }
    });
});