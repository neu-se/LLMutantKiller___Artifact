import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when pageurl ends with index.html', () => {
        const linkurl = "http://example.com/aaa/bbb/ccc";
        const pageurl = "http://example.com/aaa/bbb/index.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});