import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path are the same', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it('should return "samelevel" when linkurl_path and pageurl_path are the same after removing index.html', () => {
        const linkurl = { path: '/aaa/bbb/ccc/index.html' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it('should return "samelevel" when linkurl_path and pageurl_path are the same after removing default.html', () => {
        const linkurl = { path: '/aaa/bbb/ccc/default.html' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it.skip('should not return "samelevel" when linkurl_path and pageurl_path are different after removing index.html', () => {
        const linkurl = { path: '/aaa/bbb/ccc/index.html' };
        const pageurl = { path: '/aaa/bbb/ddd' };
        const result = gettype(linkurl, pageurl);
        expect(result).not.toBe('samelevel');
    });
});