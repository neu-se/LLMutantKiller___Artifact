import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for URLs with default.html in path and trailing slash', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/default.html/';
        const pageurl = 'http://sub.domain.com/aaa/bbb/';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });
});