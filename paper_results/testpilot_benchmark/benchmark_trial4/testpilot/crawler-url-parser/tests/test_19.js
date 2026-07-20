let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse', function(done) {
        // Test 1: Basic absolute URL parsing
        let result1 = crawler_url_parser.parse("http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
        assert.strictEqual(result1.url, "http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
        assert.strictEqual(result1.baseurl, null);
        assert.strictEqual(result1.protocol, "http:");
        assert.strictEqual(result1.host, "question.stackoverflow.com");
        assert.strictEqual(result1.domain, "stackoverflow.com");
        assert.strictEqual(result1.subdomain, "question");
        assert.strictEqual(result1.path, "/aaa/bbb/ddd");
        assert.strictEqual(result1.search, "?q1=query1&q2=query2");
        assert.strictEqual(result1.querycount, 2);

        // Test 2: Relative URL with base URL
        let result2 = crawler_url_parser.parse("../ddd?q1=query1&q2=query2", "http://question.stackoverflow.com/aaa/bbb/ccc/");
        assert.strictEqual(result2.url, "http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
        assert.strictEqual(result2.baseurl, "http://question.stackoverflow.com/aaa/bbb/ccc/");
        assert.strictEqual(result2.protocol, "http:");
        assert.strictEqual(result2.host, "question.stackoverflow.com");
        assert.strictEqual(result2.domain, "stackoverflow.com");
        assert.strictEqual(result2.subdomain, "question");

        // Test 3: Undefined input
        let result3 = crawler_url_parser.parse(undefined);
        assert.strictEqual(result3, null);

        // Test 4: HTTPS URL
        let result4 = crawler_url_parser.parse("https://www.example.com/path");
        assert.strictEqual(result4.url, "https://www.example.com/path");
        assert.strictEqual(result4.protocol, "https:");
        assert.strictEqual(result4.host, "www.example.com");
        assert.strictEqual(result4.domain, "example.com");
        assert.strictEqual(result4.subdomain, "www");
        assert.strictEqual(result4.path, "/path");
        assert.strictEqual(result4.search, null);
        assert.strictEqual(result4.querycount, 0);

        // Test 5: URL with fragment (should be removed)
        let result5 = crawler_url_parser.parse("http://example.com/page#fragment");
        assert.strictEqual(result5.url, "http://example.com/page");
        assert.strictEqual(result5.protocol, "http:");
        assert.strictEqual(result5.host, "example.com");

        // Test 6: Protocol-relative URL
        let result6 = crawler_url_parser.parse("//example.com/path");
        assert.strictEqual(result6.url, "http://example.com/path");
        assert.strictEqual(result6.protocol, "http:");
        assert.strictEqual(result6.host, "example.com");

        // Test 7: Simple domain without protocol
        let result7 = crawler_url_parser.parse("example.com");
        assert.strictEqual(result7.url, "http://example.com/");
        assert.strictEqual(result7.protocol, "http:");
        assert.strictEqual(result7.host, "example.com");
        assert.strictEqual(result7.domain, "example.com");

        // Test 8: Absolute path with base URL
        let result8 = crawler_url_parser.parse("/newpath", "http://example.com/oldpath");
        assert.strictEqual(result8.url, "http://example.com/newpath");
        assert.strictEqual(result8.baseurl, "http://example.com/oldpath");
        assert.strictEqual(result8.host, "example.com");

        done();
    });
});