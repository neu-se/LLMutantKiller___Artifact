let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return throws QReturnValue with primitive value', function(done) {
        try {
            q.return(42);
            // Should not reach here
            assert.fail('Expected QReturnValue to be thrown');
        } catch (error) {
            assert.strictEqual(error.constructor.name, 'QReturnValue');
            assert.strictEqual(error.value, 42);
            done();
        }
    });

    })