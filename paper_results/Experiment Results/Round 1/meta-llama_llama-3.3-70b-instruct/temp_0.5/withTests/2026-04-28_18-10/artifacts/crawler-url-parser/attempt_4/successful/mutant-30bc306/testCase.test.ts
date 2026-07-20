import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return samelevel when the last part of the linkurl is index.html and the last part of the pageurl is also index.html', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/index.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/index.html';
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});