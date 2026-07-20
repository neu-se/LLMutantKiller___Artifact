let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should remove hash fragments', function(done) {
        let result = crawler_url_parser.parse('http://example.com/path#fragment', null);
        assert.strictEqual(result.url, 'http://example.com/path');
        assert.strictEqual(result.path, '/path');
        done();
    });

    