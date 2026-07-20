// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with query string and base URL', () => {
    it('should correctly parse query parameters when base URL is provided', () => {
        const result = parse("path?q1=value1&q2=value2", "http://example.com/base");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.search).toBe("?q1=value1&q2=value2");
            expect(result.querycount).toBe(2);
        }
    });
});