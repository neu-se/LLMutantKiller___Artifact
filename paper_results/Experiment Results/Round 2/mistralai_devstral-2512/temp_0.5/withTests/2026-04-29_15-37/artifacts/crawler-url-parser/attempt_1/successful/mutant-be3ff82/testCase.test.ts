import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel URLs with index.html paths', () => {
        const result = gettype("http://example.com/aaa/bbb/index.html", "http://example.com/aaa/bbb/index.html");
        expect(result).toBe("samelevel");
    });
});