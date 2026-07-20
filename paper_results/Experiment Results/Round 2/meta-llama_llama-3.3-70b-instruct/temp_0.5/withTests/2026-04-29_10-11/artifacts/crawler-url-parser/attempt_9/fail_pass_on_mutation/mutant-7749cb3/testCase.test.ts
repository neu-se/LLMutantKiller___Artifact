import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return samelevel for same level URLs with index document in link URL and default document in page URL', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        let pageurl = "http://sub.domain.com/aaa/bbb/default.html";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});