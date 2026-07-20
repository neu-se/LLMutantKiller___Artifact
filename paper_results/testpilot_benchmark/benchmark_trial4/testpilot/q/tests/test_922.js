let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.allSettled with non-promise values', function(done) {
        let promises = [
            'plain string',
            42,
            { key: 'value' },
            q.resolve('actual promise')
        ];
        
        q(promises).allSettled().then(function(states) {
            assert.equal(states.length, 4);
            
            assert.equal(states[0].state, 'fulfilled');
            assert.equal(states[0].value, 'plain string');
            
            assert.equal(states[1].state, 'fulfilled');
            assert.equal(states[1].value, 42);
            
            assert.equal(states[2].state, 'fulfilled');
            assert.deepEqual(states[2].value, { key: 'value' });
            
            assert.equal(states[3].state, 'fulfilled');
            assert.equal(states[3].value, 'actual promise');
            
            done();
        }).catch(done);
    });

    })