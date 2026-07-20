let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.return throws QReturnValue with undefined value', function(done) {
        try {
            q.return(undefined);
            assert.fail('Expected q.return to throw');
        } catch (error) {
            assert.strictEqual(error.constructor.name, 'QReturnValue');
            assert.strictEqual(error.value, undefined);
            done();
        }
    });
});