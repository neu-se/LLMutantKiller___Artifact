let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post with various argument types', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        let capturedArgs = null;
        mockPromise.dispatch = function(method, args) {
            capturedArgs = args;
            return q.resolve();
        };
        
        let testArgs = [1, 'string', {key: 'value'}, null];
        mockPromise.post('complexMethod', testArgs);
        
        assert.deepStrictEqual(capturedArgs, ['complexMethod', testArgs], 'should preserve argument types');
        done();
    });
});