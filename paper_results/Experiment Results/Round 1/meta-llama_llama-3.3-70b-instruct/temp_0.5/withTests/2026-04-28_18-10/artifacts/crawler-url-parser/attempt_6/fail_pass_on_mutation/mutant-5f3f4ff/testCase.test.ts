import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "sublevel" for sub level urls when part_count_diff is 1 and linkurl has same path as pageurl without last part', function () {
        let linkurl = "http://sub.domain.com/aaa/bbb";
        let pageurl = "http://sub.domain.com/aaa/bbb/ccc";
        let result = gettype(linkurl, pageurl);
        expect(result).toBe("uplevel");
    });
});