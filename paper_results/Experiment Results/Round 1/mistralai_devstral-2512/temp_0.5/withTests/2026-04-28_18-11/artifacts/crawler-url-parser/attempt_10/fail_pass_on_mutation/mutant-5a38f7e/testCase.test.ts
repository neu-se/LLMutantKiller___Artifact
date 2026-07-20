// test/mutant-5a38f7e.test.ts
import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with path comparison', () => {
    it('should correctly handle path comparison when linkurl path is empty', () => {
        const result = gettype("http://example.com", "http://example.com/path");
        expect(result).toBe("uplevel");
    });
});