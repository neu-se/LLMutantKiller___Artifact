let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.log should return -Infinity for log of zero', function(done) {
        let result = complex_js.ZERO.log();
        
        // Check if the result is -Infinity (which is the mathematical result for log(0))
        if (result === -Infinity || (typeof result === 'object' && result.re === -Infinity)) {
            done();
        } else {
            done(new Error('Expected log of zero to return -Infinity, but it returned: ' + result));
        }
    });
});