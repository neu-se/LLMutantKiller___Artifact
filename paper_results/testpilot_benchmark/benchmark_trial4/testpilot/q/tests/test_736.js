let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke with rejected promise', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        mockPromise.dispatch = function(method, args) {
            return q.reject(new Error('dispatch failed'));
        };
        
        let result = mockPromise.invoke('failingMethod');
        
        result.then(function() {
            done(new Error('Expected promise to be rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'dispatch failed');
            done();
        });
    });
});