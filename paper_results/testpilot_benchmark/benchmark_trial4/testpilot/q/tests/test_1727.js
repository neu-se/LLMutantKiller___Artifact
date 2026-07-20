let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should overwrite existing property', function(done) {
        let obj = { age: 25 };
        q.set(obj, 'age', 30);
        assert.strictEqual(obj.age, 30);
        done();
    });
});