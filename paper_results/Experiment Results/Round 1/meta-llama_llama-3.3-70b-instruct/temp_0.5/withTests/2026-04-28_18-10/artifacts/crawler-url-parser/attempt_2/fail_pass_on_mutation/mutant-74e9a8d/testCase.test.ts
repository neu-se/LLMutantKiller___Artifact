import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('Test gettype function', () => {
    it('should return samelevel when linkurl_path and pageurl_path are the same after removing index.[a-z]+ and default.[a-z]+', () => {
        let linkurl = { path: '/aaa/bbb/index.html' };
        let pageurl = { path: '/aaa/bbb/default.html' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});