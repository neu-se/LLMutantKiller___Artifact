import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with path comparison', () => {
    it('should correctly identify same domain with different path depths', () => {
        const result = gettype("http://example.com/aaa/bbb/ccc", "http://example.com/aaa");
        expect(result).toBe("sublevel");
    });
});