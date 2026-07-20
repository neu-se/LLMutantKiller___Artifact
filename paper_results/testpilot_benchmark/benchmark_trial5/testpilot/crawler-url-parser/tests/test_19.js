let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype', function(done) {
        // Test sublevel - link goes deeper than page
        let result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/ccc", "sub.domain.com/aaa/bbb/");
        assert.equal(result, "sublevel");
        
        // Test uplevel - link goes up from page
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "uplevel");
        
        // Test samelevel - same directory level
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/eee", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "samelevel");
        
        // Test external - different domains
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/eee", "sub.anotherdomain.com/aaa/bbb/ccc");
        assert.equal(result, "external");
        
        // Test internal - same host but different structure
        result = crawler_url_parser.gettype("sub.domain.com/xxx/yyy", "sub.domain.com/aaa/bbb/ccc");
        assert.equal(result, "internal");
        
        // Test subdomain - same domain, different subdomain
        result = crawler_url_parser.gettype("www.domain.com/page", "api.domain.com/page");
        assert.equal(result, "subdomain");
        
        // Test updomain - moving to parent domain
        result = crawler_url_parser.gettype("domain.com/page", "sub.domain.com/page");
        assert.equal(result, "updomain");
        
        // Test with index.html files (should be normalized)
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/index.html", "sub.domain.com/aaa/bbb/ccc/");
        assert.equal(result, "uplevel");
        
        // Test with default.php files (should be normalized)
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/ccc/default.php", "sub.domain.com/aaa/bbb/");
        assert.equal(result, "sublevel");
        
        // Test exact same URLs
        result = crawler_url_parser.gettype("sub.domain.com/aaa/bbb/", "sub.domain.com/aaa/bbb/");
        assert.equal(result, "samelevel");
        
        done();
    });
});