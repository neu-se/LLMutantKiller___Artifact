// testCase.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should return "sublevel" for URLs with part_count_diff == 1', () => {
        const result = gettype("http://example.com/aaa/bbb/ccc", "http://example.com/aaa/bbb");
        expect(result).toBe("sublevel");
    });
});