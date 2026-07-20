let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should handle protocol-relative URLs', function(done) {
        let result = crawler_url_parser.parse('//cdn.example.com/script.js', 'https://example.com/');
        assert.strictEqual(typeof result, 'object');
        done();
    });

    