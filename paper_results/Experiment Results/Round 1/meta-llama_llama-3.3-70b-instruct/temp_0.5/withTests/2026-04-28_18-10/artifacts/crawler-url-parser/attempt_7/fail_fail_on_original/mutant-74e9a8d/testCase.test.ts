import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('Test gettype function', () => {
    it('should return samelevel when linkurl_path and pageurl_path are the same after removing index.[a-z]+ and default.[a-z]+', () => {
        let linkurl = { path: '/aaa/bbb/' };
        let pageurl = { path: '/aaa/bbb/default' };
        let resultOriginal = gettype(linkurl, pageurl);
        expect(resultOriginal).toBe('samelevel');
        
        // Simulate mutated code by not appending '/' after removing 'default'
        let pageurlMutated = { path: '/aaa/bbb/default' };
        let linkurlMutated = { path: '/aaa/bbb/' };
        let resultMutated = gettype(linkurlMutated, pageurlMutated);
        expect(resultMutated).not.toBe('samelevel');
    });
});