import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return samelevel for same level urls with default document', () => {
        const linkUrl = 'http://sub.domain.com/aaa/bbb/default.html';
        const pageUrl = 'http://sub.domain.com/aaa/bbb/';
        const result = gettype(linkUrl, pageUrl);
        expect(pageUrl.replace(/\/index\.[a-z]+$/, '/')).toBe(pageUrl);
        expect(result).toBe('samelevel');
    });
});