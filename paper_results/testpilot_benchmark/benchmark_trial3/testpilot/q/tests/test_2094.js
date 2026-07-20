let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.timeout - zero timeout', function(done) {
        let deferred = q.defer();
        let customError = new Error('Immediate timeout');
        let timeoutPromise = q.timeout(deferred.promise, 0, customError);
        
        timeoutPromise.then(() => {
            done(new Error('Promise should have timed out immediately'));
        }).catch(error => {
            assert.equal(error.message, 'Immediate timeout');
            done();
        });
    });
});