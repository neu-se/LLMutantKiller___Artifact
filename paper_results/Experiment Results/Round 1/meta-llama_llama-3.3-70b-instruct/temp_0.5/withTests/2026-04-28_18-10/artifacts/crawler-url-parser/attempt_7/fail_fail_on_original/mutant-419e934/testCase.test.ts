import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type when pageurl_path ends with index.html and linkurl_path does not', () => {
        const linkurl = { path: '/aaa/bbb/ccc' };
        const pageurl = { path: '/aaa/bbb/index.html' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});