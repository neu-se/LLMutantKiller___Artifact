let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allResolved with mixed fulfilled and rejected promises', function(done) {
        let promise1 = q.resolve('success');
        let promise2 = q.reject(new Error('failure'));
        let promise3 = q.resolve(42);
        
        q.allResolved([promise1, promise2, promise3])
            .then(function(results) {
                assert.equal(results.length, 3);
                assert.equal(results[0].inspect().state, 'fulfilled');
                assert.equal(results[0].inspect().value, 'success');
                assert.equal(results[1].inspect().state, 'rejected');
                assert.equal(results[1].inspect().reason.message, 'failure');
                assert.equal(results[2].inspect().state, 'fulfilled');
                assert.equal(results[2].inspect().value, 42);
                done();
            })
            .catch(done);
    });
});