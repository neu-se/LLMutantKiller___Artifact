let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.defer.prototype.makeNodeResolver', function() {
        
        it('should prioritize error over values when both are provided', function(done) {
            let deferred = q.defer();
            let resolver = deferred.makeNodeResolver();
            let testError = new Error('Priority error');
            
            deferred.promise.catch(function(error) {
                assert.strictEqual(error, testError);
                done();
            });
            
            resolver(testError, 'value1', 'value2');
        });
        
            })
})