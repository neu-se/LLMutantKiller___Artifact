// test/mutant-9e43d4c.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with URL containing auth credentials', () => {
    it('should correctly handle URLs with username and password', () => {
        const result = parse("http://user:pass@example.com/path");
        expect(result).not.toBeNull();
        if (result) {
            expect(result.url).toBe("http://user:pass@example.com/path");
            expect(result.host).toBe("user:pass@example.com");
        }
    });
});