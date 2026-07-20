let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.npost - dispatch failure', function(done) {
        let mockObject = {
            dispatch: function(method, args) {
                // Simulate dispatch failure
                return q.reject(new Error('dispatch failed'));
            }
        };
        
        let promise = q.makePromise.prototype.npost.call(mockObject, 'testMethod', ['arg1']);
        
        promise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'dispatch failed');
            done();
        });
    });
});