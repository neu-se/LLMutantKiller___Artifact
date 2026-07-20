import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass the test for baseUrl query parameters parsing', function () {
        let url = "../ddd";
        let baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc?param1=value1&param2=value2";
        let result = parse(url, baseUrl);
        if (result !== null) {
            let parsedUrl = new URL(result.url);
            let queryParams = parsedUrl.searchParams;
            expect(queryParams.toString()).toBe("");
        } else {
            expect(result).toBeNull();
        }
    });
});