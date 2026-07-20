import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', function () {
    it('should return "samelevel" when linkurl and pageurl have the same domain and subdomain', function () {
        let linkurl = { subdomain: 'sub', domain: 'example', path: '/path/aaa' };
        let pageurl = { subdomain: 'sub', domain: 'example', path: '/path/bbb' };
        let result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});