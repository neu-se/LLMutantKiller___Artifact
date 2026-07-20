let mocha = require('mocha');
let assert = require('assert');
let crawler_url_parser = require('crawler-url-parser');

describe('test crawler_url_parser', function() {
    it('test crawler-url-parser.gettype', function(done) {
        // Test external links (different domains)
        assert.equal(
            crawler_url_parser.gettype('https://google.com/page', 'https://example.com/home'),
            'external'
        );
        
        // Test subdomain links (same domain, different subdomain)
        assert.equal(
            crawler_url_parser.gettype('https://blog.example.com/post', 'https://www.example.com/home'),
            'subdomain'
        );
        
        // Test updomain links (going from subdomain to main domain)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/page', 'https://blog.example.com/post'),
            'updomain'
        );
        
        // Test internal links (same host, different structure)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/completely/different/path', 'https://example.com/some/page'),
            'internal'
        );
        
        // Test sublevel links (one level deeper)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/blog/post', 'https://example.com/blog/'),
            'sublevel'
        );
        
        // Test uplevel links (one level up)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/blog/', 'https://example.com/blog/post'),
            'uplevel'
        );
        
        // Test samelevel links (same directory level)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/blog/post1', 'https://example.com/blog/post2'),
            'samelevel'
        );
        
        // Test with index.html files (should be normalized)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/blog/index.html', 'https://example.com/blog/'),
            'samelevel'
        );
        
        // Test with default.php files (should be normalized)
        assert.equal(
            crawler_url_parser.gettype('https://example.com/section/default.php', 'https://example.com/section/'),
            'samelevel'
        );
        
        // Test root level paths
        assert.equal(
            crawler_url_parser.gettype('https://example.com/', 'https://example.com/about'),
            'uplevel'
        );
        
        done();
    });
});