import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function test', () => {
    it('should return samelevel for same level urls with default document', () => {
        const linkUrl = 'http://sub.domain.com/aaa/bbb/index.html';
        const pageUrl = 'http://sub.domain.com/aaa/bbb/ccc';
        const result = gettype(linkUrl, pageUrl);
        expect(result).toBe('samelevel');
    });
});