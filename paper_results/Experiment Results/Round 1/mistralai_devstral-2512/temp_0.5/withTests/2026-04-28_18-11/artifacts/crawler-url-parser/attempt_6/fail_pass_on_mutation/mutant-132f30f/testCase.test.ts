// test/stripWWW-test.js

const assert = require('assert');
const cup = require("../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js");

describe('URL parsing behavior', function() {
    it('should preserve www in URLs as currently implemented', function() {
        let result = cup.parse("http://www.example.com");
        assert.equal(result.url, "http://www.example.com/");
    });
});