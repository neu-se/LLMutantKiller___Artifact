import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with fragment', function () {
    it('should not have hash property', function () {
        let res = parse("http://www.stackoverflow.com/aaa/bbb/ccc#hhh");
        expect(res.url.includes('#')).toBe(false);
    });
});