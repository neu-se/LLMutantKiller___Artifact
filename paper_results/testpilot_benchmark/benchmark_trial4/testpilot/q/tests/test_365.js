let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy allows method chaining', function(done) {
        // Create a promise using q.makePromise
        let promise = q.makePromise({
            when: function(value) {
                return value;
            }
        });
        
        // Test that passByCopy can be chained with other methods
        let result = promise.passByCopy().passByCopy();
        assert.strictEqual(result, promise, 'passByCopy should allow method chaining');
        done();
    });

    })