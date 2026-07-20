let mocha = require('mocha');
let assert = require('assert');
let Q = require('q');

describe('test q', function() {
    it('test q.set with different value types', function(done) {
        let obj = {};
        
        Q.set(obj, 'number', 123)
            .then(function() {
                return Q.set(obj, 'boolean', true);
            })
            .then(function() {
                return Q.set(obj, 'object', { nested: 'value' });
            })
            .then(function() {
                assert.strictEqual(obj.number, 123);
                assert.strictEqual(obj.boolean, true);
                assert.deepStrictEqual(obj.object, { nested: 'value' });
                done();
            })
            .catch(done);
    });

    })