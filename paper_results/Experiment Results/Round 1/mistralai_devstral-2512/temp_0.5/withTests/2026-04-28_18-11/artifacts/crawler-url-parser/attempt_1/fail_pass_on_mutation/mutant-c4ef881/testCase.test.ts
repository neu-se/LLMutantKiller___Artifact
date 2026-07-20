import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel URLs when paths differ only in last segment', () => {
        const result = gettype("http://example.com/aaa/bbb/ccc", "http://example.com/aaa/bbb/ddd");
        expect(result).toBe("samelevel");
    });
});