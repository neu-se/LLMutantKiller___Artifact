let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete when dispatch rejects', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        mockPromise.dispatch = function(method, args) {
            return q.reject(new Error('dispatch error'));
        };
        
        let result = mockPromise.delete('error_key');
        
        result.then(function() {
            done(new Error('Promise should have been rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'dispatch error', 'should propagate dispatch error');
            done();
        });
    });
});