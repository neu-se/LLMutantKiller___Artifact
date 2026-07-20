let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.parse with root relative path', function(done) {
        let result = crawler_url_parser.parse("/newpath/file.html", "http://test.example.com/old/path/");
        
        assert.strictEqual(result.url, "http://test.example.com/newpath/file.html");
        assert.strictEqual(result.baseurl, "http://test.example.com/old/path/");
        assert.strictEqual(result.normalized, "http://test.example.com/newpath/file.html");
        assert.strictEqual(result.host, "test.example.com");
        assert.strictEqual(result.domain, "example.com");
        
        done();
    });

    