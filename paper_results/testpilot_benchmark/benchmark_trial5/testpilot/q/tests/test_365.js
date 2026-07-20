let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should call nodeback with error when promise is rejected', function(done) {
            let promise = q.reject(new Error('test error'));
            
            promise.nodeify(function(err, result) {
                assert(err instanceof Error);
                assert.equal(err.message, 'test error');
                assert.equal(result, undefined);
                done();
            });
        });

            })
})