let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test suite', function() {
    it('test case', function(done) {
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/", "sub.domain.com/aaa/bbb/ccc");
assert.equal(result, "uplevel");
    })
})