import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse url with fragment', function () {
    it('should not include fragment in url', function () {
        let res = parse("http://www.stackoverflow.com/aaa/bbb/ccc#hhh");
        expect(res.url).not.toContain("#hhh");
    });
});