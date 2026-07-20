let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with relative path without leading slash', function(done) {
        let linkurl = 'subfolder/page.html';
        let pageurl = 'https://example.com/current.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'relative');
        done();
    });
});