let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return throws QReturnValue with string value', function(done) {
        try {
            q.return('hello world');
            assert.fail('Expected QReturnValue to be thrown');
        } catch (error) {
            assert.strictEqual(error.constructor.name, 'QReturnValue');
            assert.strictEqual(error.value, 'hello world');
            done();
        }
    });

    })