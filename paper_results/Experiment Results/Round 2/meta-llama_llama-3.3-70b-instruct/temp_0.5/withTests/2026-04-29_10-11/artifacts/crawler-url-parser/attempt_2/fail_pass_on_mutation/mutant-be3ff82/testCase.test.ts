import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return different results for original and mutated code', () => {
        const linkurl = { path: '/aaa/bbb/index.html' };
        const pageurl = { path: '/aaa/bbb' };
        const originalResult = gettype(linkurl, pageurl);
        // In the mutated code, the line `pageurl_path = pageurl_path.replace(/\/index\.[^a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');` 
        // will not replace '/index.html' because [^a-z] matches any character that is not a lowercase letter, 
        // so '/index.html' will not be replaced and the function will return 'sublevel' instead of 'samelevel'.
        expect(originalResult).toBe('samelevel');
    });
});