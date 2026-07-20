let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should parse absolute URL without baseUrl', function(done) {
        let result = crawler_url_parser.parse('https://www.example.com/path?query=value', null);
        assert.strictEqual(result.url, 'https://www.example.com/path?query=value');
        assert.strictEqual(result.protocol, 'https:');
        assert.strictEqual(result.host, 'www.example.com');
        assert.strictEqual(result.domain, 'example.com');
        assert.strictEqual(result.subdomain, 'www');
        assert.strictEqual(result.path, '/path');
        assert.strictEqual(result.search, '?query=value');
        assert.strictEqual(result.querycount, 1);
        assert.strictEqual(result.baseurl, null);
        done();
    });

    