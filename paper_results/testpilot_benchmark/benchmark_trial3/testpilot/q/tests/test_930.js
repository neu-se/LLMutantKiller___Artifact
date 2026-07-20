let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with non-promise values', function(done) {
        let values = [1, 'hello', true, null];
        
        q(values).allSettled().then(function(states) {
            assert.equal(states.length, 4);
            assert.equal(states[0].state, 'fulfilled');
            assert.equal(states[0].value, 1);
            assert.equal(states[1].state, 'fulfilled');
            assert.equal(states[1].value, 'hello');
            assert.equal(states[2].state, 'fulfilled');
            assert.equal(states[2].value, true);
            assert.equal(states[3].state, 'fulfilled');
            assert.equal(states[3].value, null);
            done();
        }).catch(done);
    });
});