import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', function () {
    it('should return "samelevel" for same level urls with default document and index document', function () {
        let linkurl = "http://www.stackoverflow.com/aaa/bbb/index.html";
        let pageurl = "http://www.stackoverflow.com/aaa/bbb/default.html";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });
});