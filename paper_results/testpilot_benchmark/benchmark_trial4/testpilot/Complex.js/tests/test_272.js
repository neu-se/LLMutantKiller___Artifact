let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.toString', function(done) {
        // Test ZERO constant
        let result = complex_js.ZERO.toString();
        assert.strictEqual(result, "0");
        done();
    });

    })