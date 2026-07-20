// test/mutant-5a38f7e.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with empty path in linkurl', () => {
    it('should handle empty path in linkurl correctly', () => {
        const result = gettype("http://example.com", "http://example.com/some/path");
        expect(result).toBe("internal");
    });
});