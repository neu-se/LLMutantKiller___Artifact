import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return samelevel for same level URLs with default document', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        let pageurl = "http://sub.domain.com/aaa/bbb/default.html";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it.skip('should return samelevel for same level URLs with default document and no trailing slash', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        let pageurl = "http://sub.domain.com/aaa/bbb/default";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});