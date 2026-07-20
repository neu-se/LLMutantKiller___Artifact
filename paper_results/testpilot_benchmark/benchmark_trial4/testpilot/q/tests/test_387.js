let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - same string values', function(done) {
        let promise1 = q.resolve("hello");
        let promise2 = q.resolve("hello");
        
        promise1.join(promise2)
            .then(function(result) {
                assert.strictEqual(result, "hello");
                done();
            })
            .catch(done);
    });

    })