let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with resolved array', function(done) {
        // Test that spread applies the fulfilled function with array elements as arguments
        let promise = q.resolve([10, 20, 30]);
        
        promise.spread(function(a, b, c) {
            assert.equal(a, 10);
            assert.equal(b, 20);
            assert.equal(c, 30);
            return a + b + c;
        }).then(function(result) {
            assert.equal(result, 60);
            done();
        }).catch(done);
    });

    })