let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString does not depend on promise state', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        // Test toString before resolving
        let beforeResolve = promise.toString();
        assert.strictEqual(beforeResolve, "[object Promise]");
        
        // Resolve the promise and test toString again
        deferred.resolve("test value");
        
        // Use setTimeout to ensure promise is resolved
        setTimeout(() => {
            let afterResolve = promise.toString();
            assert.strictEqual(afterResolve, "[object Promise]");
            assert.strictEqual(beforeResolve, afterResolve);
            done();
        }, 0);
    });

    })