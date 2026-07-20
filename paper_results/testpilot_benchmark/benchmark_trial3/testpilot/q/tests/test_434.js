let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test toString consistency', function(done) {
        // Test 4: Multiple calls to toString should return consistent results
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let firstCall = promise.toString();
        let secondCall = promise.toString();
        
        assert.strictEqual(firstCall, secondCall, 'Multiple toString calls should return the same result');
        
        done();
    });
});