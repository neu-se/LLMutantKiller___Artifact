import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "sublevel" when linkurl_path is a subdirectory of pageurl_path and has an index.html file', () => {
        const linkurl = { path: '/aaa/bbb/ccc/index.html' };
        const pageurl = { path: '/aaa/bbb/' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('sublevel');
    });

    it('should return "sublevel" when linkurl_path is a subdirectory of pageurl_path and has a default.html file', () => {
        const linkurl = { path: '/aaa/bbb/ccc/default.html' };
        const pageurl = { path: '/aaa/bbb/' };
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('sublevel');
    });
});