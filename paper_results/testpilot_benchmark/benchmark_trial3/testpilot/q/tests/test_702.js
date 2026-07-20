let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete returns promise from dispatch', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let expectedResult = q.resolve('custom_result');
        
        mockPromise.dispatch = function(method, args) {
            return expectedResult;
        };
        
        let result = mockPromise.delete('any_key');
        
        // Verify the exact promise from dispatch is returned
        assert.strictEqual(result, expectedResult, 'should return the promise from dispatch');
        
        done();
    });
});