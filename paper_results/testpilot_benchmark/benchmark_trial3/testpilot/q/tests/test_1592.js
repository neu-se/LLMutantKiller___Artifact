let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return throws QReturnValue with null value', function(done) {
        try {
            q.return(null);
            assert.fail('Expected QReturnValue to be thrown');
        } catch (error) {
            assert.strictEqual(error.constructor.name, 'QReturnValue');
            assert.strictEqual(error.value, null);
            done();
        }
    });

    })