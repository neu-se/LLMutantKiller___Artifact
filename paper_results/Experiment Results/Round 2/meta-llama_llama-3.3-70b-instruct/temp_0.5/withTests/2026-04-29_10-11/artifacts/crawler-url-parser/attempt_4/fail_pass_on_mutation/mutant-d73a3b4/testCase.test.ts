import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for URLs with index.html in path', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/index.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/default.html';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });
});