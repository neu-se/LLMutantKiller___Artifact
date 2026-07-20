let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.getUnhandledReasons immutability', function(done) {
        let reasons = q.getUnhandledReasons();
        let originalLength = reasons.length;
        
        // Try to modify the returned array
        reasons.push('malicious entry');
        reasons.pop();
        reasons[0] = 'modified';
        
        // Get fresh copy and verify internal state wasn't affected
        let freshReasons = q.getUnhandledReasons();
        assert.strictEqual(freshReasons.length, originalLength, 
            'Internal state should not be affected by modifications to returned array');
        done();
    });
});