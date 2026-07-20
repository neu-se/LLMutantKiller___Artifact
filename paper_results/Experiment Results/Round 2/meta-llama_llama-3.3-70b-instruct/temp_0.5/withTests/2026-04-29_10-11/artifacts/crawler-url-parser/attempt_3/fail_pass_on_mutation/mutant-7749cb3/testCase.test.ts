import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return samelevel for same level URLs with default document and trailing slash', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/index.html";
        let pageurl = "http://sub.domain.com/aaa/bbb/default.html";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });

    it('should return internal for same level URLs with no default document and no trailing slash in page URL', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("sublevel");
    });

    it('should return internal for same level URLs with no default document and trailing slash in page URL', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("sublevel");
    });
});