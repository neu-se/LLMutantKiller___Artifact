import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass for url with semicolon in path', function () {
        let url = "http://www.example.com/path;a=1/b=2";
        let result = parse(url);
        expect(result.path).toBe("/path");
    });
});