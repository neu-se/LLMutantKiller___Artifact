import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass for query string with plus sign', function () {
        let url = "http://www.example.com/path?a=1+2";
        let result = parse(url);
        expect(result.search).toBe("?a=1 2");
    });
});