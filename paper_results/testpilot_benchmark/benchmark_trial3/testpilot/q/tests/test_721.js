let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.post returns promise from dispatch', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let expectedResult = q.resolve('test result');
        
        mockPromise.dispatch = function(method, args) {
            return expectedResult;
        };
        
        let actualResult = mockPromise.post('test', []);
        
        assert.strictEqual(actualResult, expectedResult, 'should return the same promise from dispatch');
        done();
    });
});