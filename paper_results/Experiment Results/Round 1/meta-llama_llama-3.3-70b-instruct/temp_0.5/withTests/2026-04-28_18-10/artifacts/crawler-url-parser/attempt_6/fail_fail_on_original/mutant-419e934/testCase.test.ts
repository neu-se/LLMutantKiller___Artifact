import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type when linkurl_path and pageurl_path have the same directory but different file names', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/index.html' };
        linkurl.path = linkurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        pageurl.path = pageurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});