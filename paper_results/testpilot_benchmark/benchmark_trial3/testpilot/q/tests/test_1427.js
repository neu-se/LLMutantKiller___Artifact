let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons returns copy not reference', function(done) {
        let reasons1 = q.getUnhandledReasons();
        let reasons2 = q.getUnhandledReasons();
        
        // Should be different array instances
        assert(reasons1 !== reasons2, 'getUnhandledReasons should return a new array each time');
        
        // Modifying one should not affect the other
        reasons1.push('test');
        assert.strictEqual(reasons2.length, q.getUnhandledReasons().length, 
            'Modifying returned array should not affect internal state');
        done();
    });

    })