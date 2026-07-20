let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.passByCopy', function() {
        
        it('should work with resolved promises', function(done) {
            let promise = q.resolve(42);
            let result = promise.passByCopy();
            
            assert.strictEqual(result, promise, 'passByCopy should work with resolved promises');
            
            result.then(function(value) {
                assert.strictEqual(value, 42, 'Promise value should be preserved');
                done();
            }).catch(done);
        });
        
            })
})