import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "samelevel" when linkurl_subdomain_len equals pageurl_subdomain_len in original code and "updomain" in mutated code', function () {
        let linkurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        let pageurl = { subdomain: 'sub', domain: 'example', path: '/path' };
        let result = gettype(linkurl, pageurl);
        expect(result).not.toBe('updomain');
    });
});