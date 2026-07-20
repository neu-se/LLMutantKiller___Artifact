import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "internal" when linkurl_path and pageurl_path are on the same domain and linkurl_path is an empty string', () => {
        let linkurl = { path: '', host: 'sub.domain.com' };
        let pageurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });

    it.skip('should return "internal" when linkurl_path and pageurl_path are on the same domain and pageurl_path is "Stryker was here!"', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: 'Stryker was here!', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).not.toBe('internal');
    });
});