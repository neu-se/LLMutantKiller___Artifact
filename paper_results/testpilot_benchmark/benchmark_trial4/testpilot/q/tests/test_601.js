let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread return value', function(done) {
        let promise = q.resolve([5, 10]);
        
        let spreadPromise = promise.spread(function(a, b) {
            return a + b;
        });

        spreadPromise.then(function(result) {
            assert.equal(result, 15);
            done();
        }).catch(done);
    });
});