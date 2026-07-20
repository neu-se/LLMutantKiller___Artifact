let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delay - preserves resolved value', function(done) {
        const testObject = { foo: 'bar', num: 42 };
        
        q.resolve(testObject)
            .delay(50)
            .then(function(value) {
                assert.deepStrictEqual(value, testObject, 'Object should be preserved after delay');
                done();
            })
            .catch(done);
    });
});