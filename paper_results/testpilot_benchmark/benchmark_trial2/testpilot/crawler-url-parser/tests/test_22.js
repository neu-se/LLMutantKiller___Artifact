let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse with relative URL and base URL', function(done) {
        let result = crawler_url_parser.parse("../ddd?q1=query1&q2=query2", "http://question.stackoverflow.com/aaa/bbb/ccc/");
        
        assert.strictEqual(result.url, "http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
        assert.strictEqual(result.baseurl, "http://question.stackoverflow.com/aaa/bbb/ccc/");
        assert.strictEqual(result.normalized, "http://question.stackoverflow.com/aaa/bbb/ddd?q1=query1&q2=query2");
        assert.strictEqual(result.host, "question.stackoverflow.com");
        assert.strictEqual(result.domain, "stackoverflow.com");
        
        done();
    });

    