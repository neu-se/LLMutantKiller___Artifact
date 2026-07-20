import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs with a base URL that has a query string and a relative URL with a query string', () => {
        const currentUrlStr = '../ddd?a=1&b=2';
        const baseUrlStr = 'http://www.stackoverflow.com/aaa/bbb/ccc?c=3&d=4#baseFragment';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result.baseurl).toBe('http://www.stackoverflow.com/aaa/bbb/ccc');
    });
});