import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return correct type for URLs with index.html in path', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html/ddd';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
        expect(gettype(linkurl, pageurl)).toBe('sublevel');
    });
});