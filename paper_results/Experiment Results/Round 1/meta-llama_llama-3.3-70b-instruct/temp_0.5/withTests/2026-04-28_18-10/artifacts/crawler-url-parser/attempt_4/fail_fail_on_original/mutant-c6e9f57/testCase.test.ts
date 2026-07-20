import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should remove www subdomain', function () {
        let res = parse("http://www.google.com/aaa?q=example&utm_source=example&utm_medium=example");
        expect(res.url).toBe("http://google.com/aaa?q=example");
    });
});