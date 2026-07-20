import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for urls with index.html at the end of linkurl', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc/index.html";
        const pageurl = "http://sub.domain.com/aaa/bbb/ccc/default.html";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});