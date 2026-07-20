import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return samelevel for same level URLs with default document in link URL and index document in page URL without trailing slash', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/default";
        let pageurl = "http://sub.domain.com/aaa/bbb/index";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});