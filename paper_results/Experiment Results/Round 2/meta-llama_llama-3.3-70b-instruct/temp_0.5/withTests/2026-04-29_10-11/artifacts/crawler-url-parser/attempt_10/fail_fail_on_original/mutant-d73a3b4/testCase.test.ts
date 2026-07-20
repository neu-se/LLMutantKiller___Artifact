import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for URLs with index.html in path and no replacement', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/index.html/ccc/index.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });
});