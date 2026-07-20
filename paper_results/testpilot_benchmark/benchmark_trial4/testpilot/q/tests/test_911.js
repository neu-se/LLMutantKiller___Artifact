let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.allSettled', function() {
        
        it('should handle non-promise values', function(done) {
            q.allSettled([1, 'hello', true, null])
                .then(function(results) {
                    assert.equal(results.length, 4);
                    assert.equal(results[0].state, 'fulfilled');
                    assert.equal(results[0].value, 1);
                    assert.equal(results[1].state, 'fulfilled');
                    assert.equal(results[1].value, 'hello');
                    assert.equal(results[2].state, 'fulfilled');
                    assert.equal(results[2].value, true);
                    assert.equal(results[3].state, 'fulfilled');
                    assert.equal(results[3].value, null);
                    done();
                })
                .catch(done);
        });

            })
})