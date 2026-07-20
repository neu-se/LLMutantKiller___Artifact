let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.set - should set property on existing object', function(done) {
        let obj = { age: 25 };
        q.set(obj, 'name', 'Jane');
        assert.strictEqual(obj.name, 'Jane');
        assert.strictEqual(obj.age, 25);
        done();
    });

    })