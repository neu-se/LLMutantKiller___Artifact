let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should call nodeback with (error) when promise rejects', function(done) {
            let testError = new Error('test error');
            let promise = q.reject(testError);
            
            promise.nodeify(function(error, value) {
                assert.strictEqual(error, testError);
                assert.strictEqual(value, undefined);
                done();
            });
        });
        
    });
});