import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as samelevel, sublevel, uplevel', () => {
    it('should correctly identify samelevel URLs with trailing slashes', () => {
        const result = gettype("http://example.com/aaa/bbb/", "http://example.com/aaa/ccc/");
        expect(result).toBe("samelevel");
    });
});