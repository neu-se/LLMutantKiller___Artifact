let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.inverse should throw error', function() {
        assert.throws(function() {
            complex_js.ZERO.inverse();
        }, Error);
    });
});