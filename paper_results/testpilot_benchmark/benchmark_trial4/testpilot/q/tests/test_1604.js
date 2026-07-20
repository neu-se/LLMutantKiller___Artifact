let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return throws QReturnValue with string value', function(done) {
        try {
            q.return('hello world');
            assert.fail('Expected q.return to throw');
        } catch (error) {
            assert.strictEqual(error.constructor.name, 'QReturnValue');
            assert.strictEqual(error.value, 'hello world');
            done();
        }
    });
});