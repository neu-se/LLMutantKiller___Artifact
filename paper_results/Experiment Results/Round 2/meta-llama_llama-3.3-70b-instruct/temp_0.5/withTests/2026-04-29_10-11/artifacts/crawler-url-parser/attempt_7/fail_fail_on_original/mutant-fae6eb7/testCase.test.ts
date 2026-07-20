import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl', function () {
    it('should parse correctly with baseUrl', function () {
        let url = "http://www.google.com";
        let baseUrl = "http://www.stackoverflow.com#abc#def#ghi";
        let result = parse(url, baseUrl);
        expect(result.baseurl).toBe("http://www.stackoverflow.com");
    });
});