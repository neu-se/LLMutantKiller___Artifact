import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "samelevel" for same level urls', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/eee", "//sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("samelevel");
    });

    it('should return "sublevel" for sublevel urls', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/ccc/ddd", "//sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("sublevel");
    });

    it('should return "uplevel" for uplevel urls', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/ccc", "//sub.domain.com/aaa/bbb/ccc/ddd");
        expect(res).toBe("uplevel");
    });

    it.skip('should return "internal" for internal urls', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/ddd", "//sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("internal");
    });

    it('should return "external" for external urls', function () {
        let res = gettype("//sub.domain.com/aaa/bbb/eee", "//sub.anotherdomain.com/aaa/bbb/ccc");
        expect(res).toBe("external");
    });

    it('should return "samelevel" for same level urls without protocol', function () {
        let res = gettype("sub.domain.com/aaa/bbb/eee", "sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("samelevel");
    });

    it('should return "sublevel" for sublevel urls without protocol', function () {
        let res = gettype("sub.domain.com/aaa/bbb/ccc/ddd", "sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("sublevel");
    });

    it('should return "uplevel" for uplevel urls without protocol', function () {
        let res = gettype("sub.domain.com/aaa/bbb/ccc", "sub.domain.com/aaa/bbb/ccc/ddd");
        expect(res).toBe("uplevel");
    });

    it.skip('should return "internal" for internal urls without protocol', function () {
        let res = gettype("sub.domain.com/aaa/bbb/ddd", "sub.domain.com/aaa/bbb/ccc");
        expect(res).toBe("internal");
    });

    it('should return "external" for external urls without protocol', function () {
        let res = gettype("sub.domain.com/aaa/bbb/eee", "sub.anotherdomain.com/aaa/bbb/ccc");
        expect(res).toBe("external");
    });
});