import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should not return samelevel when paths have different parent directories', () => {
        const result = gettype("http://example.com/aaa/bbb/ccc", "http://example.com/aaa/ddd/eee");
        expect(result).not.toBe("samelevel");
    });
});