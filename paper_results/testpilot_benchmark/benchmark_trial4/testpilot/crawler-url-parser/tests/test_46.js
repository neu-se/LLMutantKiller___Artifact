let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with protocol-relative URL', function(done) {
        let linkurl = '//test.com/page.html';
        let pageurl = 'https://test.com/current.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'protocol-relative');
        done();
    });
})