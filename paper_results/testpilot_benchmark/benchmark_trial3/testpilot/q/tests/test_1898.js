let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with object containing various property types', function(done) {
        let obj = {
            string: 'hello',
            number: 42,
            boolean: true,
            null: null,
            undefined: undefined,
            array: [1, 2, 3],
            object: { nested: true }
        };
        q.keys(obj).then(function(keys) {
            let expectedKeys = ['string', 'number', 'boolean', 'null', 'undefined', 'array', 'object'];
            assert.deepEqual(keys.sort(), expectedKeys.sort());
            done();
        }).catch(done);
    });

    })