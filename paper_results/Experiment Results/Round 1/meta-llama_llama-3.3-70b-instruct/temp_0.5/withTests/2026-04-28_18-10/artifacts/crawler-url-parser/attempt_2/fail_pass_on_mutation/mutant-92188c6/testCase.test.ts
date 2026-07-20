import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass for query string', function () {
        let url = "http://www.example.com/path?a=1&b=2#hash";
        let result = parse(url);
        expect(result.search).toBe("?a=1&b=2");
    });
});