import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass for "http://www.google.com"', function () {
        let res = parse("http://www.google.com");
        expect(res.url).toBe("http://www.google.com/");
    });
});