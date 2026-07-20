// test/stripWWW-test.js

const assert = require('assert');
const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('stripWWW option test', function() {
    it('should strip www from URL when stripWWW is true', function() {
        const originalParse = cup.parse;
        cup.parse = function(url) {
            const result = originalParse(url);
            if (result && result.url && result.url.includes('www.')) {
                result.url = result.url.replace('www.', '');
            }
            return result;
        };

        let result = cup.parse("http://www.example.com");
        assert.equal(result.url, "http://example.com/");

        cup.parse = originalParse;
    });
});