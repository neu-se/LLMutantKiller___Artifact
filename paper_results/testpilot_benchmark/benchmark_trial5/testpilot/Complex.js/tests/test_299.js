let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns correct primitive value', function(done) {
        // Test that ZERO.valueOf() returns the expected primitive representation
        let result = complex_js.ZERO.valueOf();
        
        // valueOf() should return a number representation of the complex number
        assert.strictEqual(typeof result, 'number');
        assert.strictEqual(result, 0);
        
        done();
    });

})