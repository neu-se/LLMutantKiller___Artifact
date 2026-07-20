let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.passByCopy with nested objects', function(done) {
        let nestedObject = {
            outer: {
                inner: {
                    value: 'deep'
                }
            },
            array: [1, 2, { nested: true }]
        };
        
        let result = q.passByCopy(nestedObject);
        
        assert.strictEqual(result, nestedObject, 'should return the same object reference');
        assert.strictEqual(result.outer.inner.value, 'deep', 'nested properties should be accessible');
        done();
    });

    })