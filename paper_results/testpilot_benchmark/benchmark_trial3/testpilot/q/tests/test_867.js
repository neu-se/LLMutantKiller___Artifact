let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.any - handles single promise that rejects', function(done) {
        let deferred = q.defer();
        
        q.any([deferred.promise]).then(function(result) {
            done(new Error('Should not resolve'));
        }).catch(function(error) {
            assert.equal(error.message, 'single error');
            done();
        });
        
        setTimeout(() => deferred.reject(new Error('single error')), 10);
    });
});