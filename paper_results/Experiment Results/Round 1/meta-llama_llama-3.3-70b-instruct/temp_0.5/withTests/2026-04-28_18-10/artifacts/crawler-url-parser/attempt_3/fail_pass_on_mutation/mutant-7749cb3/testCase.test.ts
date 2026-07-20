import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', function () {
    it('should return "samelevel" for same level urls with default document', function () {
        let res = gettype("http://www.stackoverflow.com/aaa/bbb/default.html", "http://www.stackoverflow.com/aaa/bbb/");
        expect(res).toBe("samelevel");
    });
});