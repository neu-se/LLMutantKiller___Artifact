let mocha = require('mocha');
let assert = require('assert');
let _ = require('lodash');

describe('test q', function() {
    it('test q.set - should overwrite existing property', function(done) {
        let obj = { age: 25 };
        _.set(obj, 'age', 30);
        assert.strictEqual(obj.age, 30);
        done();
    });
});