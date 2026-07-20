let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with all rejected promises', function(done) {
        let promises = [
            q.reject(new Error('error1')),
            q.reject(new Error('error2')),
            q.reject(new Error('error3'))
        ];
        
        q(promises).allSettled().then(function(states) {
            assert.equal(states.length, 3);
            assert.equal(states[0].state, 'rejected');
            assert.equal(states[0].reason.message, 'error1');
            assert.equal(states[1].state, 'rejected');
            assert.equal(states[1].reason.message, 'error2');
            assert.equal(states[2].state, 'rejected');
            assert.equal(states[2].reason.message, 'error3');
            done();
        }).catch(done);
    });

    })