import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
    it('should correctly parse URLs with a base URL and fragment in the base URL', () => {
        const currentUrlStr = '../ddd';
        const baseUrlStr = 'http://www.stackoverflow.com/aaa/bbb/ccc#baseFragment?query=param';
        const result = parse(currentUrlStr, baseUrlStr);
        expect(result.url).toBe('http://www.stackoverflow.com/aaa/ddd');
    });
});