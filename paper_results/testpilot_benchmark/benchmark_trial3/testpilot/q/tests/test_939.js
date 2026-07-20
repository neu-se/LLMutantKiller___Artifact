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
        
        q.allSettled(promises).then(function(results) {
            assert.equal(results.length, 4);
            
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 'success');
            
            assert.equal(results[1].state, 'rejected');
            assert.equal(results[1].reason.message, 'failure');
            
            assert.equal(results[2].state, 'fulfilled');
            assert.equal(results[2].value, 42);
            
            assert.equal(results[3].state, 'rejected');
            assert.equal(results[3].reason.message, 'another failure');
            
            done();
        }).catch(done);
    });
});