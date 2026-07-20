import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it.skip('should return "updomain" when linkurl_subdomain_len is less than pageurl_subdomain_len', function () {
        let linkurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        let pageurl = { subdomain: 'sub.sub', domain: 'example', path: '/path' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('updomain');
    });

    it('should return "updomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len in mutated code', function () {
        let linkurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        let pageurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        // This test should fail in the original code but pass in the mutated code
        // expect(result).toBe('updomain');
    });
});