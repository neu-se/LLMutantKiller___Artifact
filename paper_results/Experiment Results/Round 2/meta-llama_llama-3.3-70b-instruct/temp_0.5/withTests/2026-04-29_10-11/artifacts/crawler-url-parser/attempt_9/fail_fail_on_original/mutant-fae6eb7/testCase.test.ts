import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl', function () {
    it('should parse correctly with baseUrl', function () {
        let url = "#abc";
        let baseUrl = "http://www.stackoverflow.com#def";
        let result = parse(url, baseUrl);
        expect(result.url).toBe("http://www.stackoverflow.com/abc");
    });
});