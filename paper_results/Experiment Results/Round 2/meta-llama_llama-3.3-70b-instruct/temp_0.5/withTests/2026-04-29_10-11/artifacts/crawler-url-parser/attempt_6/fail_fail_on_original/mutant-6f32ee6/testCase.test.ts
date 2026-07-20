import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype url as updomain', function() {
    it('should gettype updomain urls', function() {
        let res = gettype("http://domain.com","http://domain.com");
        expect(res).toBe("internal");
    });
});