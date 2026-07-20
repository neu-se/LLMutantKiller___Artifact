import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "internal" for internal urls when part_count_diff is -1', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc/ddd";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc/ddd/eee";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("internal");
    });
});