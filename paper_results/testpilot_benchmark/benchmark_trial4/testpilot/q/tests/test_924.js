let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with delayed promises', function(done) {
        let promises = [
            q.delay(10).then(() => 'fast'),
            q.delay(50).then(() => 'slow'),
            q.delay(20).then(() => { throw new Error('delayed error'); })
        ];
        
        q(promises).allSettled().then(function(states) {
            assert.equal(states.length, 3);
            
            assert.equal(states[0].state, 'fulfilled');
            assert.equal(states[0].value, 'fast');
            
            assert.equal(states[1].state, 'fulfilled');
            assert.equal(states[1].value, 'slow');
            
            assert.equal(states[2].state, 'rejected');
            assert.equal(states[2].reason.message, 'delayed error');
            
            done();
        }).catch(done);
    });
});