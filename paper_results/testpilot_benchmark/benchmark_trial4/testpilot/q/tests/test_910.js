let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.allSettled', function() {
        
        it('should resolve with empty array when given empty input', function(done) {
            q.allSettled([])
                .then(function(results) {
                    assert.equal(results.length, 0);
                    assert(Array.isArray(results));
                    done();
                })
                .catch(done);
        });

            })
})