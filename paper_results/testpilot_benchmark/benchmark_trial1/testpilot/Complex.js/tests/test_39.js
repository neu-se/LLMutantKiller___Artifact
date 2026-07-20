let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test suite', function() {
    it('test case', function(done) {
        let result3 = complex_js.ZERO.sub({re: 2, im: -5});
assert.equal(result3.re, -2);
assert.equal(result3.im, 5);
    })
})