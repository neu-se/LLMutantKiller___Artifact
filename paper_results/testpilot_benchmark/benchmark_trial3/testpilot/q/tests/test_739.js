let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.invoke with dispatch rejection', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        
        mockPromise.dispatch = function(method, args) {
            return q.reject(new Error('dispatch failed'));
        };
        
        mockPromise.invoke('failingMethod').then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.equal(error.message, 'dispatch failed');
            done();
        });
    });
});