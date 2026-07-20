let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy returns this', function(done) {
        // Create a promise using q.makePromise
        let promise = q.makePromise({
            when: function(value) {
                return value;
            }
        });
        
        // Test that passByCopy returns the same promise object
        let result = promise.passByCopy();
        assert.strictEqual(result, promise, 'passByCopy should return the same promise object');
        done();
    });

    })