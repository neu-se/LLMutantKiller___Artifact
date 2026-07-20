let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.timeout - resolves before timeout', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise.timeout(1000, new Error('Timeout error'));
        
        // Resolve the promise quickly
        setTimeout(() => {
            deferred.resolve('success');
        }, 100);
        
        promise.then(result => {
            assert.equal(result, 'success');
            done();
        }).catch(done);
    });

    })