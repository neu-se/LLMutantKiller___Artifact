let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - resolves with object', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        let testObject = { key: 'value', number: 42 };
        
        let resolvedPromise = promise.thenResolve(testObject);
        
        resolvedPromise.then(function(value) {
            assert.deepStrictEqual(value, testObject);
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
    
    })