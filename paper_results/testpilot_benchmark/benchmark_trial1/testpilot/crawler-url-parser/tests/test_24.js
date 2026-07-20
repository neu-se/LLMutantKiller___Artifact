let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype', function(done) {
        // Test sublevel - when linkurl is a subdirectory of pageurl
        let result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "sublevel");

        // Test uplevel - when linkurl is a parent directory of pageurl
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/ccc/ddd", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "uplevel");

        // Test samelevel - when linkurl and pageurl are at the same directory level
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/eee", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "samelevel");

        // Test external - when linkurl and pageurl are on different domains
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/eee", "sub.anotherdomain.com/aaa/bbb/ccc");
        assert.equal(result, "external");

        // Additional test cases for edge scenarios
        
        // Test same URL
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/ccc", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "samelevel");

        // Test root level comparison
        result = crawler_url_parser.gettype("sub.domain.com/", "sub.domain.com/aaa");
        assert.equal(result, "sublevel");

        // Test different protocols (should be external)
        result = crawler_url_parser.gettype("https://domain.com/path", "http://domain.com/path");
        assert.equal(result, "external");

        done();
    });
});