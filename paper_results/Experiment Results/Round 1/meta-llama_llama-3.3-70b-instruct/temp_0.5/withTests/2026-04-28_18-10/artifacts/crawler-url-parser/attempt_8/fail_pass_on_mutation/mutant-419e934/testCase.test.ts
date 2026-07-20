import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type when pageurl_path ends with index.html and linkurl_path ends with default.html', () => {
        const linkurl = { path: '/aaa/bbb/default.html' };
        const pageurl = { path: '/aaa/bbb/index.html' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});