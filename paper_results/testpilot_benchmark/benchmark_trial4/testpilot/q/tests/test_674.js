let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set when dispatch rejects', function(done) {
        let mockPromise = {
            dispatch: function(method, args) {
                return q.reject(new Error('dispatch failed'));
            }
        };
        
        let result = q.makePromise.prototype.set.call(mockPromise, 'key', 'value');
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'dispatch failed');
            done();
        });
    });
});