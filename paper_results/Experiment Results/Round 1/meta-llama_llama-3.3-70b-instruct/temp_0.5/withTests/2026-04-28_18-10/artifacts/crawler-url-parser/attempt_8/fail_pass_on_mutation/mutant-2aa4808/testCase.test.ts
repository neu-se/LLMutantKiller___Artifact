import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs with a base URL that has a fragment and a relative URL with a query string', () => {
        const currentUrlStr = '../ddd?a=1&b=2';
        const baseUrlStr = 'http://www.stackoverflow.com/aaa/bbb/ccc#baseFragment';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result.url).toBe('http://www.stackoverflow.com/aaa/ddd?a=1&b=2');
    });
});