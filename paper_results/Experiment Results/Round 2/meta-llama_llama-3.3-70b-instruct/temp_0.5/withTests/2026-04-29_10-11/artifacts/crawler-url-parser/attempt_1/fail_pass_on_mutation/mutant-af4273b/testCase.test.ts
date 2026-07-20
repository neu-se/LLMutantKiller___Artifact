import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function test', function () {
    it('should pass the test for relative URL', function () {
        let url = "/ddd";
        let baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        let result = parse(url, baseUrl);
        expect(result.url).toBe("http://www.stackoverflow.com/ddd");
    });

    it('should pass the test for relative URL with query parameters', function () {
        let url = "/ddd?q1=query1&q2=query2";
        let baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        let result = parse(url, baseUrl);
        expect(result.url).toBe("http://www.stackoverflow.com/ddd?q1=query1&q2=query2");
    });

    it('should pass the test for relative URL without query parameters', function () {
        let url = "/ddd";
        let baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        let result = parse(url, baseUrl);
        expect(result.url).toBe("http://www.stackoverflow.com/ddd");
    });

    it('should pass the test for absolute URL', function () {
        let url = "http://www.google.com/ddd";
        let baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        let result = parse(url, baseUrl);
        expect(result.url).toBe("http://www.google.com/ddd");
    });

    it('should pass the test for absolute URL with query parameters', function () {
        let url = "http://www.google.com/ddd?q1=query1&q2=query2";
        let baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc";
        let result = parse(url, baseUrl);
        expect(result.url).toBe("http://www.google.com/ddd?q1=query1&q2=query2");
    });
});