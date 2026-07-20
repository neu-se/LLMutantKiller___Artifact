let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should parse absolute URL with same base URL', function(done) {
        let currentUrl = 'https://example.com/page1';
        let baseUrl = 'https://example.com/';
        let result = crawler_url_parser.parse(currentUrl, baseUrl);
        assert.strictEqual(typeof result, 'object');
        done();
    });

    })