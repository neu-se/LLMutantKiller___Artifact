import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path are the same after removing trailing slash', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/ccc/' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should return "samelevel" when linkurl_path and pageurl_path are the same after removing trailing slash and index.html', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/ccc/index.html/' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});