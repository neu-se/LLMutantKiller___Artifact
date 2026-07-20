let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.timeout - zero timeout', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise.timeout(0, new Error('Immediate timeout'));
        
        promise.then(() => {
            done(new Error('Promise should have timed out immediately'));
        }).catch(error => {
            assert.equal(error.message, 'Immediate timeout');
            done();
        });
    });
});