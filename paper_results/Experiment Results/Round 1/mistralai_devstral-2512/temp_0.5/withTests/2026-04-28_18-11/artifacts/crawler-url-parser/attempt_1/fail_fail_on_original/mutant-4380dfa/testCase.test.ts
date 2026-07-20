// test/09_mutant-test.js

const assert = require('assert');
const cup = require("../");

describe('parse protocol-less URLs', function() {
    it('should add http:// protocol to protocol-less URLs starting with //', function() {
        let res = cup.parse("//example.com/path");
        assert.equal(res.url, "http://example.com/path");
    });
});