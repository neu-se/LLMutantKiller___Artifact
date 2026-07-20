let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - chaining after rejection', function(done) {
        const originalReason = 'original error';
        const rejectedPromise = q.Promise.reject(originalReason);
        
        rejectedPromise
            .then(function(value) {
                return 'should not reach here';
            })
            .catch(function(reason) {
                assert.strictEqual(reason, originalReason);
                return 'recovered';
            })
            .then(function(value) {
                assert.strictEqual(value, 'recovered');
                done();
            })
            .catch(done);
    });
});