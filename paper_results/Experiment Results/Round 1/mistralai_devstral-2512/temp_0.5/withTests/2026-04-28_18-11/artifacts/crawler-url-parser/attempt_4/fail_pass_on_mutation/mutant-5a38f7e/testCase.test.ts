// test/mutant-5a38f7e.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with path comparison', () => {
    it('should correctly identify same path levels', () => {
        const result = gettype("http://example.com/path1", "http://example.com/path2");
        expect(result).toBe("samelevel");
    });
});