let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with mixed resolved and rejected promises', function(done) {
        let promises = [
            q.resolve('success'),
            q.reject(new Error('failure')),
            q.resolve(42),
            q.reject(new Error('another failure'))
        ];
        
        q(promises).allSettled().then(function(states) {
            assert.equal(states.length, 4);
            
            assert.equal(states[0].state, 'fulfilled');
            assert.equal(states[0].value, 'success');
            
            assert.equal(states[1].state, 'rejected');
            assert.equal(states[1].reason.message, 'failure');
            
            assert.equal(states[2].state, 'fulfilled');
            assert.equal(states[2].value, 42);
            
            assert.equal(states[3].state, 'rejected');
            assert.equal(states[3].reason.message, 'another failure');
            
            done();
        }).catch(done);
    });
});