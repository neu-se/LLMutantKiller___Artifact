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

        // Test 5: URL without query parameters
        let result5 = crawler_url_parser.parse("http://example.com/test");
        assert.strictEqual(result5.url, "http://example.com/test");
        assert.strictEqual(result5.search, null);
        assert.strictEqual(result5.querycount, 0);

        // Test 6: URL with fragment (should be removed)
        let result6 = crawler_url_parser.parse("http://example.com/test#fragment");
        assert.strictEqual(result6.url, "http://example.com/test");

        // Test 7: Protocol-relative URL
        let result7 = crawler_url_parser.parse("//example.com/test");
        assert.strictEqual(result7.url, "http://example.com/test");
        assert.strictEqual(result7.protocol, "http:");

        // Test 8: Root domain without subdomain
        let result8 = crawler_url_parser.parse("http://example.com");
        assert.strictEqual(result8.domain, "example.com");
        assert.strictEqual(result8.subdomain, null);

        done();
    });
});