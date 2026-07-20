import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should not include fragment in search', () => {
        const url = 'http://www.google.com/aaa/bbb/ccc?a=1&b=2#fragment?query=fragment';
        const result = parse(url);
        expect(result.search).not.toContain('#');
    });
});