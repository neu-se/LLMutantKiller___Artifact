let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.passByCopy exists and is a function', function(done) {
        // Create a promise using q.makePromise
        let promise = q.makePromise({
            when: function(value) {
                return value;
            }
        });
        
        // Test that passByCopy method exists and is a function
        assert.strictEqual(typeof promise.passByCopy, 'function', 'passByCopy should be a function');
        done();
    });

    })