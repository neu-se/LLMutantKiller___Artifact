import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as updomain', function() {
    it('should gettype updomain urls', function() {
        let res = gettype("http://sub.domain.com","http://sub.domain.com");
        expect(res).toBe("samelevel");
    });
});