import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "samelevel" for same level urls when part_count_diff is 0', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb/ccc";
        let pageurl = "http://sub.domain.com/aaa/bbb/ddd";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("samelevel");
    });
});