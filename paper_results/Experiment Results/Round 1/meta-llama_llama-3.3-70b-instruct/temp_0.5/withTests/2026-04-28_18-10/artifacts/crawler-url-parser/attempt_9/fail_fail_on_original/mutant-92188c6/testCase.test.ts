import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass for url with encoded characters', function () {
        let url = "http://www.example.com/path?a=%3F";
        let result = parse(url);
        expect(result.search).toBe("?a=?");
    });
});