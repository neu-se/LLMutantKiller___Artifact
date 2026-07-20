let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.keys with plain object', function(done) {
        let testObj = { a: 1, b: 2, c: 3 };
        
        q.keys(testObj)
            .then(function(keys) {
                assert.deepEqual(keys.sort(), ['a', 'b', 'c']);
                done();
            })
            .catch(done);
    });

    })