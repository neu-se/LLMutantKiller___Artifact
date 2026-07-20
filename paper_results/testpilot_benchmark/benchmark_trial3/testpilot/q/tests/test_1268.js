let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should call nodeback with (null, value) when promise resolves', function(done) {
            let promise = q.resolve('test value');
            
            promise.nodeify(function(error, value) {
                assert.strictEqual(error, null);
                assert.strictEqual(value, 'test value');
                done();
            });
        });
        
    });
});