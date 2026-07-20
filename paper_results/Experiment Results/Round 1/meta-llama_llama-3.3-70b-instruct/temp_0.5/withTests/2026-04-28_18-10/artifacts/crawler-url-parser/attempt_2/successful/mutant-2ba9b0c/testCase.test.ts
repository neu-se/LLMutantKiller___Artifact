import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "samelevel" for same level urls', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/", "//sub.domain.com/aaa/bbb/");
        expect(res).toBe("samelevel");
    });

    it('should return "samelevel" for same level urls without protocol', function () {
        let res = gettype("sub.domain.com/aaa/bbb/", "sub.domain.com/aaa/bbb/");
        expect(res).toBe("samelevel");
    });

    it.skip('should return "internal" for internal urls without trailing slash', function () {
        let res = gettype("//sub.domain.com/aaa/bbb", "//sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("internal");
    });

    it.skip('should return "internal" for internal urls with trailing slash', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/", "//sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("internal");
    });
});