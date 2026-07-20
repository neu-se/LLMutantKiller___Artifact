let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - with string reason', function(done) {
        const reason = 'Simple string rejection';
        const rejectedPromise = q.Promise.reject(reason);
        
        rejectedPromise.catch(function(rejectionReason) {
            assert.strictEqual(rejectionReason, reason);
            done();
        }).catch(done);
    });

    })