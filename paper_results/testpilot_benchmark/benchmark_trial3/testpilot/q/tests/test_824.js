let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys with object', function(done) {
        let testObj = { a: 1, b: 2, c: 3 };
        let promise = q(testObj);
        
        promise.keys().then(function(keys) {
            assert(Array.isArray(keys), 'keys should return an array');
            assert.deepEqual(keys.sort(), ['a', 'b', 'c'], 'should return object keys');
            done();
        }).catch(done);
    });

    })