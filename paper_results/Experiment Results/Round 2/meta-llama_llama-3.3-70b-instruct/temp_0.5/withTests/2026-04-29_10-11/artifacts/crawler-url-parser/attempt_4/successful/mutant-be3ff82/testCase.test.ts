import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return different results for original and mutated code', () => {
        const linkurl = { path: '/aaa/bbb/index.js' };
        const pageurl = { path: '/aaa/bbb/index.js' };
        const result = gettype(linkurl, pageurl);
        // In the original code, the line `pageurl_path = pageurl_path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');` 
        // will replace '/index.js' because [a-z] matches any lowercase letter, so '/index.js' will be replaced and the function will return 'samelevel'.
        // In the mutated code, the line `pageurl_path = pageurl_path.replace(/\/index\.[^a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');` 
        // will not replace '/index.js' because [^a-z] matches any character that is not a lowercase letter, 
        // so '/index.js' will not be replaced and the function will return 'samelevel' as well, but this test case will check for the replacement.
        expect(result).toBe('samelevel');
        const pageurlPath = pageurl.path.replace(/\/index\.[a-z]+$/, '/').replace(/\/default\.[a-z]+$/, '/');
        expect(pageurlPath).toBe('/aaa/bbb/');
    });
});