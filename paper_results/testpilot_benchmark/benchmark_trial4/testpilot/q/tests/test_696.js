let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete with null key', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let capturedArgs = null;
        
        mockPromise.dispatch = function(method, args) {
            capturedArgs = args;
            return q.resolve('null_key_result');
        };
        
        let result = mockPromise.delete(null);
        
        assert.deepStrictEqual(capturedArgs, [null], 'should handle null key');
        
        result.then(function(value) {
            assert.strictEqual(value, 'null_key_result');
            done();
        }).catch(done);
    });
});