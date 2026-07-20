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
        
        q(promises).allSettled().then(function(results) {
            assert.equal(results.length, 4);
            
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 'plain string');
            
            assert.equal(results[1].state, 'fulfilled');
            assert.equal(results[1].value, 42);
            
            assert.equal(results[2].state, 'fulfilled');
            assert.deepEqual(results[2].value, { key: 'value' });
            
            assert.equal(results[3].state, 'fulfilled');
            assert.equal(results[3].value, 'actual promise');
            
            done();
        }).catch(done);
    });
});