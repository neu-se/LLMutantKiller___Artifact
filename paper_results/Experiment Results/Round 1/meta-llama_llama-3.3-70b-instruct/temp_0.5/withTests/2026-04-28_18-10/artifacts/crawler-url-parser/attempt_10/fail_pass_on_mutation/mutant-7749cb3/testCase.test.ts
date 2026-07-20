import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', function () {
    it('should return correct type for URLs with trailing slash and index document', function () {
        let linkurl = "http://www.stackoverflow.com/aaa/bbb/";
        let pageurl = "http://www.stackoverflow.com/aaa/bbb/index.html";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });
});