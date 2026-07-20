import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', function () {
    it('should return "samelevel" for same level urls with default document and trailing slash', function () {
        let res = gettype("http://www.stackoverflow.com/aaa/bbb/default.html", "http://www.stackoverflow.com/aaa/bbb/");
        let res2 = gettype("http://www.stackoverflow.com/aaa/bbb/", "http://www.stackoverflow.com/aaa/bbb/default.html");
        expect(res).toBe("samelevel");
        expect(res2).toBe("samelevel");
    });
});