// testCase.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should return "internal" for URLs with part_count_diff == -2', () => {
        const result = gettype("http://example.com/aaa", "http://example.com/aaa/bbb/ccc");
        expect(result).toBe("internal");
    });
});