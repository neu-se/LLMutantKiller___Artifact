let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.keys - basic object', function(done) {
        let obj = { a: 1, b: 2, c: 3 };
        let promise = q(obj);
        
        promise.keys().then(function(keys) {
            assert.deepEqual(keys.sort(), ['a', 'b', 'c']);
            done();
        }).catch(done);
    });

    })