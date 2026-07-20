let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns 0', function(done) {
        // Test that ZERO.valueOf() returns 0
        let result = complex_js.ZERO.valueOf();
        assert.strictEqual(result, 0);
        assert.strictEqual(typeof result, 'number');
        done();
    });

    })