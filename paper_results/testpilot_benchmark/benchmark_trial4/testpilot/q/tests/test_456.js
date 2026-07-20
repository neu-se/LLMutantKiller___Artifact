let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.then', function() {
        
        it('should return a new promise', function() {
            let deferred = q.defer();
            let promise = deferred.promise;
            let newPromise = promise.then();
            
            assert.notEqual(promise, newPromise);
            assert(typeof newPromise.then === 'function');
        });

            })
})