let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('should parse absolute HTTPS URL correctly', function(done) {
        let result = crawler_url_parser.parse('https://subdomain.test.com/page', null);
        assert.strictEqual(result.url, 'https://subdomain.test.com/page');
        assert.strictEqual(result.protocol, 'https:');
        assert.strictEqual(result.host, 'subdomain.test.com');
        assert.strictEqual(result.domain, 'test.com');
        assert.strictEqual(result.subdomain, 'subdomain');
        assert.strictEqual(result.path, '/page');
        assert.strictEqual(result.search, null);
        assert.strictEqual(result.querycount, 0);
        done();
    });

    