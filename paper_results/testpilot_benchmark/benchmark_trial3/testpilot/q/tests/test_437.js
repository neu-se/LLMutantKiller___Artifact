let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString', function(done) {
        // Test 1: Basic toString functionality
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let toStringResult = promise.toString();
        assert(typeof toStringResult === 'string', 'toString should return a string');
        assert(toStringResult.length > 0, 'toString should return a non-empty string');
        
        done();
    });
});