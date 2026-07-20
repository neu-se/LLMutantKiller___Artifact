import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with empty path', () => {
    it('should return "external" when pageurl has no path and linkurl has a path', () => {
        const result = gettype("http://example.com/path", "http://other.com");
        expect(result).toBe("external");
    });
});