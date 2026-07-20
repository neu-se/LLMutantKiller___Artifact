let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.dispatch - returns a promise', function() {
        let mockPromise = {
            promiseDispatch: function(resolve, op, args) {
                resolve('test');
            }
        };
        
        let dispatch = q.makePromise.prototype.dispatch.bind(mockPromise);
        let result = dispatch('op', []);
        
        // Verify that dispatch returns a promise-like object
        assert(typeof result.then === 'function');
        assert(typeof result.catch === 'function');
    });
});