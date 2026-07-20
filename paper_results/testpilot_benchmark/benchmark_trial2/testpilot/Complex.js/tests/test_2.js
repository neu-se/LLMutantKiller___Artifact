let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('should create a complex number with new operator', function() {
        let c = new complex_js(3, 4);
        assert.strictEqual(c.re, 3);
        assert.strictEqual(c.im, 4);
    });

    })