let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.thenReject with undefined reason', function(done) {
        let resolvedPromise = q.resolve('test');
        
        q.thenReject(resolvedPromise, undefined)
            .then(function(value) {
                done(new Error('Promise should have been rejected'));
            })
            .catch(function(error) {
                assert.strictEqual(error, undefined);
                done();
            });
    });
});