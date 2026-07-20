let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fulfill - keys extraction', function(done) {
        let obj = { a: 1, b: 2, c: 3 };
        let promise = q.fulfill(obj);
        
        q.keys(promise).then(function(keys) {
            assert.deepStrictEqual(keys.sort(), ['a', 'b', 'c']);
            done();
        }).catch(done);
    });

    })