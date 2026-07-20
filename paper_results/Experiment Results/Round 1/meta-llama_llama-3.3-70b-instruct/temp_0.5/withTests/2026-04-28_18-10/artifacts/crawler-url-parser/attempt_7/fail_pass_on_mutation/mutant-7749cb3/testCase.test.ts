import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', function () {
    it('should return correct type for URLs with default document', function () {
        let linkurl = "http://www.stackoverflow.com/aaa/bbb/default.html";
        let pageurl = "http://www.stackoverflow.com/aaa/bbb/";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
        linkurl = "http://www.stackoverflow.com/aaa/bbb/";
        pageurl = "http://www.stackoverflow.com/aaa/bbb/default.html";
        res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });
});