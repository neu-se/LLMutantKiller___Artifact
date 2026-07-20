let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.spread with single value', function(done) {
        // Test spreading an array with a single value
        q.all([q.resolve(42)])
            .spread(function(value) {
                assert.equal(value, 42);
                assert.equal(arguments.length, 1);
                return value * 2;
            })
            .then(function(result) {
                assert.equal(result, 84);
                done();
            })
            .catch(done);
    });

    })