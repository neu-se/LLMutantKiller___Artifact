import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('gettype function', function () {
    it('should return correct type for URLs with default document and no trailing slash', function () {
        let linkurl = "http://www.stackoverflow.com/aaa/bbb/default";
        let pageurl = "http://www.stackoverflow.com/aaa/bbb";
        let res = gettype(linkurl, pageurl);
        expect(res).toBe("samelevel");
    });
});