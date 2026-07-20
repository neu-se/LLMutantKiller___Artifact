import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return samelevel for same level urls with trailing slash', () => {
        const linkUrl = 'http://sub.domain.com/aaa/bbb/';
        const pageUrl = 'http://sub.domain.com/aaa/bbb/';
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe('samelevel');
    });
});