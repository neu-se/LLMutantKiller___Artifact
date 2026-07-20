let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allSettled with delayed promises', function(done) {
        let promises = [
            q.delay(10).then(() => 'fast'),
            q.delay(50).then(() => { throw new Error('slow error'); }),
            q.delay(30).then(() => 'medium')
        ];
        
        q.allSettled(promises).then(function(results) {
            assert.equal(results.length, 3);
            assert.equal(results[0].state, 'fulfilled');
            assert.equal(results[0].value, 'fast');
            assert.equal(results[1].state, 'rejected');
            assert.equal(results[1].reason.message, 'slow error');
            assert.equal(results[2].state, 'fulfilled');
            assert.equal(results[2].value, 'medium');
            done();
        }).catch(done);
    });
});