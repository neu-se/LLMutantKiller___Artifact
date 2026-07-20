let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isPending - should return true for pending promise', function() {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        assert.strictEqual(promise.isPending(), true);
    });
    
    })