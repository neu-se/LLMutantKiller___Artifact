import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return samelevel for same level urls', () => {
        const linkUrl = 'http://sub.domain.com/aaa/bbb/ccc';
        const pageUrl = 'http://sub.domain.com/aaa/bbb/ddd';
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe('samelevel');
    });

    it('should return samelevel for same level urls with index.html', () => {
        const linkUrl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
        const pageUrl = 'http://sub.domain.com/aaa/bbb/ddd';
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe('samelevel');
    });
});