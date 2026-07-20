// testCase.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as samelevel', function() {
    it('should return "internal" for URLs with different path structures', function() {
        const result = gettype("http://example.com/aaa/bbb/ccc/ddd", "http://example.com/aaa/bbb/eee");
        expect(result).toBe("internal");
    });
});