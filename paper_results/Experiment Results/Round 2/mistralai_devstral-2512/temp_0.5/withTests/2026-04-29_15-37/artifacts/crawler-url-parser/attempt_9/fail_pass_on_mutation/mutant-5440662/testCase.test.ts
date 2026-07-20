import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with path comparison', () => {
    it('should return "uplevel" when comparing paths with different depths', () => {
        const result = gettype("http://example.com/aaa", "http://example.com/aaa/bbb");
        expect(result).toBe("uplevel");
    });
});