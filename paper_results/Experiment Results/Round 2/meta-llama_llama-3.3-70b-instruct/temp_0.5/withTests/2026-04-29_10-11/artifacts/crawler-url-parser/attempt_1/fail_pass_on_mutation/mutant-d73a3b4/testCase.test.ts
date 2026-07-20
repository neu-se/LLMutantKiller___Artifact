import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same level URLs', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ddd/index.html';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });

    it('should return "samelevel" for same level URLs with default document', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ddd/';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });
});