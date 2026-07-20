let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.catch returns a promise', function() {
        let rejectedPromise = q.reject(new Error('Test'));
        let result = q.catch(rejectedPromise, function() {});
        
        assert(q.isPromise(result), 'q.catch should return a promise');
    });
});