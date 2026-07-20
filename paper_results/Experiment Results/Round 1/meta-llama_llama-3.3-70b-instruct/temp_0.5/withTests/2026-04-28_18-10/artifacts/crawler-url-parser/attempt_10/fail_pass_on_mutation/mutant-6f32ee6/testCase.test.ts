import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should not return "updomain" when linkurl_subdomain_len is less than or equal to pageurl_subdomain_len in original code', function () {
        let linkurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        let pageurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        let result = gettype(linkurl, pageurl);
        expect(result).not.toBe('updomain');
    });
});