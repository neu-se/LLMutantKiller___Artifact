let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.allResolved with all fulfilled promises', function(done) {
        let promise1 = q.resolve(1);
        let promise2 = q.resolve(2);
        let promise3 = q.resolve(3);
        
        q.allResolved([promise1, promise2, promise3])
            .then(function(results) {
                assert.equal(results.length, 3);
                assert.equal(results[0].state, 'fulfilled');
                assert.equal(results[0].value, 1);
                assert.equal(results[1].state, 'fulfilled');
                assert.equal(results[1].value, 2);
                assert.equal(results[2].state, 'fulfilled');
                assert.equal(results[2].value, 3);
                done();
            })
            .catch(function(err) {
                // Debug: log the actual structure to understand the format
                console.log('Actual results structure:', JSON.stringify(results, null, 2));
                done(err);
            });
    });
});