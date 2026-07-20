let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.set handles dispatch rejection', function(done) {
        let mockPromise = {
            dispatch: function(method, args) {
                return q.reject(new Error('dispatch failed'));
            }
        };
        
        let setMethod = q.makePromise.prototype.set.bind(mockPromise);
        let result = setMethod('key', 'value');
        
        result.then(function() {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'dispatch failed');
            done();
        });
    });
});