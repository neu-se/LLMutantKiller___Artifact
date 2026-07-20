// testCase.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as samelevel', function() {
    it('should correctly identify non-samelevel URLs when paths have different structures', function() {
        const result = gettype("http://example.com/aaa/bbb/ccc/ddd", "http://example.com/aaa/bbb/ccc");
        expect(result).toBe("sublevel");
    });
});