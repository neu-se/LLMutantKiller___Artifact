let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve with resolved promise', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let resultPromise = promise.thenResolve('new value');
        
        resultPromise.then(function(value) {
            assert.strictEqual(value, 'new value');
            done();
        }).catch(done);
        
        deferred.resolve('original value');
    });
    
    })