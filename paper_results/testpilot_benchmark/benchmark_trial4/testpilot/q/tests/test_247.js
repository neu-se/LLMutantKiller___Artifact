let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.Promise.reject - with undefined reason', function(done) {
        const rejectedPromise = q.Promise.reject(undefined);
        
        rejectedPromise.catch(function(reason) {
            assert.strictEqual(reason, undefined);
            done();
        }).catch(done);
    });
});