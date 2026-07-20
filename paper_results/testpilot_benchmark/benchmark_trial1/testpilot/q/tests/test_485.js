let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

// Add a set method to q or create a helper function
q.set = function(obj, key, value) {
    obj[key] = value;
    return obj;
};

describe('test q', function() {
    it('test q.set - should set property on existing object', function(done) {
        let obj = { age: 25 };
        q.set(obj, 'name', 'Jane');
        assert.strictEqual(obj.name, 'Jane');
        assert.strictEqual(obj.age, 25);
        done();
    });
});