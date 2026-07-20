import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with empty path handling', () => {
    it('should correctly handle empty path in pageurl when comparing with linkurl', () => {
        const result = gettype("http://example.com/path", "http://example.com");
        expect(result).toBe("sublevel");
    });
});