let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test passByCopy with rejected promise', function(done) {
        let rejectedPromise = q.reject(new Error('test error'));
        let passByCopyPromise = rejectedPromise.passByCopy();
        
        assert(q.isPromise(passByCopyPromise), 'passByCopy should return a promise');
        
        passByCopyPromise.then(function() {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'test error', 'Should preserve rejection reason');
            done();
        });
    });

    })