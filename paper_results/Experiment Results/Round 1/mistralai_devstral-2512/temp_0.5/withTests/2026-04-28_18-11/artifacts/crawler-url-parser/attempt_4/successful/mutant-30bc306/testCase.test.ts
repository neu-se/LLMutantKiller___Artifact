import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
    it('should correctly identify samelevel when both urls end with index.htm', () => {
        const linkurl = "http://example.com/aaa/bbb/index.htm";
        const pageurl = "http://example.com/aaa/bbb/index.htm";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});