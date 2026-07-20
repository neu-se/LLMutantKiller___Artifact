import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with fragment', function () {
    it('should not include fragment', function () {
        let url = "http://www.stackoverflow.com/aaa/bbb/ccc#hhh";
        let res = parse(url);
        let expectedUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        expect(res.url).toEqual(expectedUrl);
    });
});