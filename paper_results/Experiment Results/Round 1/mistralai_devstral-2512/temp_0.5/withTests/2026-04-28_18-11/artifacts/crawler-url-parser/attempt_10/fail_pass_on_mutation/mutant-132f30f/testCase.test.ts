// test/stripWWW-test.js

const assert = require('assert');
const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('URL normalization behavior', function() {
    it('should handle www in URLs consistently', function() {
        // Test that www is preserved in the current implementation
        let result1 = cup.parse("http://www.example.com");
        let result2 = cup.parse("http://example.com");

        // These should be different URLs in the current implementation
        assert.notEqual(result1.url, result2.url);
        assert.equal(result1.url, "http://www.example.com/");
        assert.equal(result2.url, "http://example.com/");
    });
});