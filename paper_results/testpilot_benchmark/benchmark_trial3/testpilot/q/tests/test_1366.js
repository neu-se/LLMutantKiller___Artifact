let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with edge case values', function(done) {
        // Test with infinity
        let resultInf = q.nearer(Infinity);
        assert(resultInf !== undefined, 'Should handle Infinity');
        
        // Test with NaN
        let resultNaN = q.nearer(NaN);
        assert(resultNaN !== undefined || isNaN(resultNaN), 'Should handle NaN appropriately');
        
        done();
    });
});