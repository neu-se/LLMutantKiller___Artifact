import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for urls with index.html in the middle of pageurl', () => {
        const linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        const pageurl = "http://sub.domain.com/aaa/index.html/bbb/ccc";
        const result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });
});