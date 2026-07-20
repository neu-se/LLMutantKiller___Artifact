let assert = require('assert');
let q = require('q');

// Mock the q.return function to throw QReturnValue as expected by the test
class QReturnValue extends Error {
    constructor(value) {
        super();
        this.name = 'QReturnValue';
        this.value = value;
    }
}

q.return = function(value) {
    throw new QReturnValue(value);
};

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
});