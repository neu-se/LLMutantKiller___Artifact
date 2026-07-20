import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "internal" when linkurl_path and pageurl_path are on the same domain and pageurl_path is an empty string', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: '', host: 'sub.domain.com' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('internal');
    });

    it.skip('should throw an error when pageurl_path is "Stryker was here!" in the mutated code', () => {
        let linkurl = { path: '/aaa/bbb/ccc', host: 'sub.domain.com' };
        let pageurl = { path: 'Stryker was here!', host: 'sub.domain.com' };
        expect(() => gettype(linkurl, pageurl)).toThrow();
    });
});