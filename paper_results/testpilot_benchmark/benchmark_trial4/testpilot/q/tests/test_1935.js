let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.any - handles mixed resolved and rejected promises', function(done) {
        let rejectedPromise = q.delay(10).then(() => { throw new Error('rejected'); });
        let resolvedPromise = q.delay(50).then(() => 'resolved');
        
        q.any([rejectedPromise, resolvedPromise])
            .then(result => {
                assert.equal(result, 'resolved');
                done();
            })
            .catch(done);
    });
});