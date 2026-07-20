let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype with anchor link', function(done) {
        let linkurl = '#section1';
        let pageurl = 'https://example.com/page.html';
        let result = crawler_url_parser.gettype(linkurl, pageurl);
        assert.strictEqual(result, 'anchor');
        done();
    });

    })