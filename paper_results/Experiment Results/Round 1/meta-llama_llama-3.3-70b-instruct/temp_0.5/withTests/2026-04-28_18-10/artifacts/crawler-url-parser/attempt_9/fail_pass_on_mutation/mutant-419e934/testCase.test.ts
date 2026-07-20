import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type when pageurl_path and linkurl_path have the same directory and the same file name without extension', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/ccc/index.html' };
        linkurl.path = linkurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        pageurl.path = pageurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});