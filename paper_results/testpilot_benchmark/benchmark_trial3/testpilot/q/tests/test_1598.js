let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return throws QReturnValue with object value', function(done) {
        const testObj = { foo: 'bar', num: 123 };
        try {
            q.return(testObj);
            assert.fail('Expected QReturnValue to be thrown');
        } catch (error) {
            assert.strictEqual(error.constructor.name, 'QReturnValue');
            assert.deepStrictEqual(error.value, testObj);
            done();
        }
    });
});