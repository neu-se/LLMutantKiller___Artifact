import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with empty path in pageurl', () => {
    it('should return "external" when pageurl has empty path and different domain', () => {
        const result = gettype("http://example.com/path", "http://other.com");
        expect(result).toBe("external");
    });
});