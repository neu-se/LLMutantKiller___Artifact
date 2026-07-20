let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread return value', function(done) {
        let promise = q.resolve([5, 10]);
        
        let result = promise.spread(function(a, b) {
            return a + b;
        });
        
        result.then(function(sum) {
            assert.equal(sum, 15);
            done();
        }).catch(done);
    });

    })