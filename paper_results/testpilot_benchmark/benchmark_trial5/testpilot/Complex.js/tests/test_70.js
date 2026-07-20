let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test ZERO.pow return types', function(done) {
        let result = complex_js.ZERO.pow(1, 0);
        
        // Verify the result is a Complex object
        assert.ok(result.hasOwnProperty('re'));
        assert.ok(result.hasOwnProperty('im'));
        assert.strictEqual(typeof result.re, 'number');
        assert.strictEqual(typeof result.im, 'number');

        done();
    });
});