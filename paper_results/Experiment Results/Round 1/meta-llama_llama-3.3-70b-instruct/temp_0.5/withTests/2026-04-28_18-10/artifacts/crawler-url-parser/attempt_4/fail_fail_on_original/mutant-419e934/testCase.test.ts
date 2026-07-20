import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path have the same parent directory', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/index.html' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it('should return "internal" when linkurl_path is a subdirectory of pageurl_path', () => {
        const linkurl = { path: '/aaa/bbb/ccc/ddd' };
        const pageurl = { path: '/aaa/bbb/ccc' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });
});