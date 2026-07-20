let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.nfcall - underlying promise rejection', function(done) {
        // Create a promise that rejects during fapply
        function mockFunction(callback) {
            callback(null, 'should not reach here');
        }
        
        let promise = q.makePromise(mockFunction, this);
        
        // Override fapply to simulate a rejection
        promise.fapply = function() {
            return q.reject(new Error('fapply failed'));
        };
        
        promise.nfcall()
            .then(() => {
                done(new Error('Should have rejected'));
            })
            .catch(error => {
                assert.strictEqual(error.message, 'fapply failed');
                done();
            });
    });
});