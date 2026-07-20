let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with primitive values', function(done) {
        let testNumber = 123;
        let testString = 'hello';
        let testBoolean = true;
        
        assert.strictEqual(q.passByCopy(testNumber), testNumber);
        assert.strictEqual(q.passByCopy(testString), testString);
        assert.strictEqual(q.passByCopy(testBoolean), testBoolean);
        done();
    });
});