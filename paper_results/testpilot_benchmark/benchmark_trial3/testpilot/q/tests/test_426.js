let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString does not depend on promise state', function(done) {
        let deferred = q.defer();
        let pendingPromise = deferred.promise;
        
        // Test pending promise
        assert.strictEqual(pendingPromise.toString(), "[object Promise]");
        
        // Resolve the promise and test again
        deferred.resolve('resolved');
        assert.strictEqual(pendingPromise.toString(), "[object Promise]");
        
        done();
    });

    })