import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should parse url correctly with fragment', () => {
        const url = 'http://www.google.com/aaa/bbb/ccc#fragment';
        const result = parse(url);
        expect(result.url).toBe('http://www.google.com/aaa/bbb/ccc');
    });
});