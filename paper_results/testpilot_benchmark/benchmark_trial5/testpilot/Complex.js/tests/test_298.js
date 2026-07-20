let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf is consistent with toString', function(done) {
        // Test that valueOf() and toString() return the same result for ZERO
        let valueOfResult = complex_js.ZERO.valueOf();
        let toStringResult = complex_js.ZERO.toString();
        
        assert.strictEqual(String(valueOfResult), toStringResult);
        
        done();
    });

})