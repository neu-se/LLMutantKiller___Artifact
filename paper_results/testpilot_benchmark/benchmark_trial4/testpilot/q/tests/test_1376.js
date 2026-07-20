let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nearer with pending promise', function(done) {
        // Create a pending promise
        let deferred = q.defer();
        let pendingPromise = deferred.promise;
        
        // q.nearer should return the promise itself since it's not fulfilled
        let result = q.nearer(pendingPromise);
        assert.strictEqual(result, pendingPromise);
        done();
    });
    
    })