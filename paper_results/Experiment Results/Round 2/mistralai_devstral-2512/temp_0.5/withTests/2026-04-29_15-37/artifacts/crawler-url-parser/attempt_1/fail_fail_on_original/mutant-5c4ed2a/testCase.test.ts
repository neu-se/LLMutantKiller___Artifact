// test/09_baseurl-fragment-test.js

const assert = require('assert');
const cup = require("../");

describe('parse baseUrl with fragment', function() {
    it('should remove fragment from baseUrl with multiple characters', function() {
        let res = cup.parse("http://example.com/path", "http://base.example.com#fragment123");
        assert.equal(res.baseurl, "http://base.example.com/");
    });
});