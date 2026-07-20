let mocha = require('mocha');
let assert = require('assert');
let complex_js = require('complex.js');

describe('test complex_js', function() {
    it('test complex.js.ZERO.valueOf returns same value on multiple calls', function(done) {
        // Test that valueOf() is deterministic and returns the same value each time
        let firstCall = complex_js.ZERO.valueOf();
        let secondCall = complex_js.ZERO.valueOf();
        let thirdCall = complex_js.ZERO.valueOf();
        
        assert.strictEqual(firstCall, secondCall);
        assert.strictEqual(secondCall, thirdCall);
        assert.strictEqual(firstCall, thirdCall);
        
        done();
    });

    })