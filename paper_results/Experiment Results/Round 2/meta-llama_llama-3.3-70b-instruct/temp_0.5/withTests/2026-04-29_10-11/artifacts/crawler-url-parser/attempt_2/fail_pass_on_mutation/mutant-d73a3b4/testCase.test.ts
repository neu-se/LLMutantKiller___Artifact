import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
    it('should return "samelevel" for same level URLs with index.html', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/index.html';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });

    it('should return "samelevel" for same level URLs without index.html', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ccc/';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });

    it('should return "samelevel" for same level URLs with default document', () => {
        const linkurl = 'http://sub.domain.com/aaa/bbb/ccc/default.aspx';
        const pageurl = 'http://sub.domain.com/aaa/bbb/ddd/default.aspx';
        expect(gettype(linkurl, pageurl)).toBe('samelevel');
    });
});