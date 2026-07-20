import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return internal for same level URLs with default document and trailing slash in link URL', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/default.html";
        let pageurl = "http://sub.domain.com/aaa/bbb/index.html";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });

    it('should return internal for same level URLs with default document and no trailing slash in page URL', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/default";
        let pageurl = "http://sub.domain.com/aaa/bbb/index.html";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });
});