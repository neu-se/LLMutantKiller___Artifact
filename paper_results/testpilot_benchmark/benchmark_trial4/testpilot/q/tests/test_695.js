let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete with undefined key', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let capturedArgs = null;
        
        mockPromise.dispatch = function(method, args) {
            capturedArgs = args;
            return q.resolve('undefined_key_result');
        };
        
        let result = mockPromise.delete(undefined);
        
        assert.deepStrictEqual(capturedArgs, [undefined], 'should handle undefined key');
        
        result.then(function(value) {
            assert.strictEqual(value, 'undefined_key_result');
            done();
        }).catch(done);
    });
});