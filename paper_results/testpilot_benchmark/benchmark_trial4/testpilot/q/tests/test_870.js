let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - rejects with single rejected promise', function(done) {
        let deferred = q.defer();
        let anyPromise = q.all([deferred.promise]).any();
        
        anyPromise.then(function(result) {
            done(new Error('Should have rejected'));
        }).catch(function(error) {
            assert.strictEqual(error.message, 'single error');
            done();
        });
        
        deferred.reject(new Error('single error'));
    });
});