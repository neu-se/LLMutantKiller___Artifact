let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with mixed resolved and rejected promises', function(done) {
        let promise1 = q.resolve('success');
        let promise2 = q.reject(new Error('failure'));
        let promise3 = q.resolve(42);
        
        q([promise1, promise2, promise3]).allSettled().then(function(states) {
            assert.equal(states.length, 3);
            assert.equal(states[0].state, 'fulfilled');
            assert.equal(states[0].value, 'success');
            assert.equal(states[1].state, 'rejected');
            assert.equal(states[1].reason.message, 'failure');
            assert.equal(states[2].state, 'fulfilled');
            assert.equal(states[2].value, 42);
            done();
        }).catch(done);
    });
});