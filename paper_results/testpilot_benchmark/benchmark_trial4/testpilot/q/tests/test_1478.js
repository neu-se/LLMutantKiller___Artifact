let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - keys method returns object keys', function(done) {
        let testObj = { a: 1, b: 2, c: 3 };
        let promise = q.fulfill(testObj);
        
        let keys = promise.keys();
        
        assert.deepStrictEqual(keys.sort(), ['a', 'b', 'c']);
        done();
    });

    })