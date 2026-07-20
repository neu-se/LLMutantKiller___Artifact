import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return samelevel when the paths are the same except the last part and the last part is index.html', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/index.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ccc';
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });

    it('should return samelevel when the paths are the same except the last part and the last part is default.html', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/default.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ccc';
        const result = gettype(linkurl, pageurl);
        expect(result).toBe('samelevel');
    });
});