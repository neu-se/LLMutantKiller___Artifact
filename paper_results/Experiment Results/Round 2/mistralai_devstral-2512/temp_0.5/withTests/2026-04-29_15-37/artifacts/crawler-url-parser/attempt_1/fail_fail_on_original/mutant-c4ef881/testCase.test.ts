// testCase.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as samelevel', function() {
    it('should correctly identify non-samelevel URLs', function() {
        const result = gettype("http://example.com/aaa/bbb/ccc", "http://example.com/aaa/bbb/ddd");
        expect(result).not.toBe("samelevel");
    });
});