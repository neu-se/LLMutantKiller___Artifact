let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test toString on rejected promise', function(done) {
        // Test 3: toString on a rejected promise
        let rejectedPromise = q.reject(new Error('test error'));
        
        let toStringResult = rejectedPromise.toString();
        assert(typeof toStringResult === 'string', 'toString should return a string for rejected promise');
        assert(toStringResult.length > 0, 'toString should return a non-empty string for rejected promise');
        
        // Prevent unhandled rejection warning
        rejectedPromise.catch(() => {});
        
        done();
    });
    
    })