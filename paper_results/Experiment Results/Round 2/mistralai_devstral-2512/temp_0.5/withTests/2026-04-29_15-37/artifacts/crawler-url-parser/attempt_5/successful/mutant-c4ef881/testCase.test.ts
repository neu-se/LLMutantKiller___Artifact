// testCase.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as samelevel', function() {
    it('should return "internal" for URLs with completely different paths', function() {
        const result = gettype("http://example.com/aaa/bbb/ccc", "http://example.com/xxx/yyy/zzz");
        expect(result).toBe("internal");
    });
});