import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with fragment', function () {
    it('should remove fragment', function () {
        let originalUrl = "http://www.stackoverflow.com/aaa/bbb/ccc#hhh";
        let res = parse(originalUrl);
        expect(res.url).not.toBe(originalUrl);
    });
});