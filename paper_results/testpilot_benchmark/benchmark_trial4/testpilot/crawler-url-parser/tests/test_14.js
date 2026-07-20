let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should handle URLs without query parameters', function(done) {
        let result = crawler_url_parser.parse('https://example.com/path', null);
        assert.strictEqual(result.querycount, 0);
        assert.strictEqual(result.search, null);
        done();
    });

    