let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.thenResolve - works with object values', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let objectValue = { name: 'test', id: 123 };
        let chainedPromise = promise.thenResolve(objectValue);
        
        chainedPromise.then(function(value) {
            assert.deepStrictEqual(value, objectValue);
            assert.strictEqual(value.name, 'test');
            assert.strictEqual(value.id, 123);
            done();
        }).catch(done);
        
        deferred.resolve();
    });
    
    })