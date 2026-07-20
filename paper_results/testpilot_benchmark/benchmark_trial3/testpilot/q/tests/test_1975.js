let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allSettled with all rejected promises', function(done) {
        let promises = [
            q.reject(new Error('error1')),
            q.reject(new Error('error2')),
            q.reject(new Error('error3'))
        ];
        
        q.allSettled(promises).then(function(results) {
            assert.equal(results.length, 3);
            assert.equal(results[0].state, 'rejected');
            assert.equal(results[0].reason.message, 'error1');
            assert.equal(results[1].state, 'rejected');
            assert.equal(results[1].reason.message, 'error2');
            assert.equal(results[2].state, 'rejected');
            assert.equal(results[2].reason.message, 'error3');
            done();
        }).catch(done);
    });
});