import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass the test for query parameters parsing', function () {
        let url = "http://www.stackoverflow.com/aaa/bbb/ccc?param1=value1&param2=value2";
        let result = parse(url);
        let parsedUrl = new URL(result.url);
        let queryParams = parsedUrl.searchParams;
        expect(queryParams.get('param1')).toBe('value1');
        expect(queryParams.get('param2')).toBe('value2');
    });
});