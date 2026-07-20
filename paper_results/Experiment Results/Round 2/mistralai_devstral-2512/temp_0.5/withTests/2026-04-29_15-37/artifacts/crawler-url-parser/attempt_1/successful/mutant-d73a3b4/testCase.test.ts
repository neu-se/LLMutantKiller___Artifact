import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when linkurl_path contains index.html in the middle', () => {
        const linkurl = "http://example.com/aaa/index.html/bbb";
        const pageurl = "http://example.com/aaa/index.html/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});