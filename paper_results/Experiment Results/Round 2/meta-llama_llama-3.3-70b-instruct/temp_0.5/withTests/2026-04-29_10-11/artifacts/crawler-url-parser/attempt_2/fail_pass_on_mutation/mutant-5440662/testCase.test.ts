import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" when linkurl_path and pageurl_path are the same and pageurl_path is empty string', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: '', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });

    it('should return "internal" when linkurl_path and pageurl_path are on the same domain but different paths and pageurl_path is empty string', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: '', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });
});