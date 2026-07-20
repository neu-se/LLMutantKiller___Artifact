let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.passByCopy', function() {
        
        it('should be chainable with other promise methods', function(done) {
            let deferred = q.defer();
            let promise = deferred.promise;
            
            let result = promise.passByCopy().then(function(value) {
                return value * 2;
            });
            
            assert.strictEqual(typeof result.then, 'function', 'Should return a thenable');
            
            deferred.resolve(21);
            
            result.then(function(value) {
                assert.strictEqual(value, 42, 'Chaining should work correctly');
                done();
            }).catch(done);
        });
        
            })
})