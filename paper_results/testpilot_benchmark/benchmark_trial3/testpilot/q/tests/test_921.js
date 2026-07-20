let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with all resolved promises', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.resolve(2);
        let promise3 = q.resolve(3);
        
        q([promise1, promise2, promise3]).allSettled().then(function(states) {
            assert.equal(states.length, 3);
            assert.equal(states[0].state, 'fulfilled');
            assert.equal(states[0].value, 1);
            assert.equal(states[1].state, 'fulfilled');
            assert.equal(states[1].value, 2);
            assert.equal(states[2].state, 'fulfilled');
            assert.equal(states[2].value, 3);
            done();
        }).catch(done);
    });

    })