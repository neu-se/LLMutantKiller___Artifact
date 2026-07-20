let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.toString returns same value for different promises', function(done) {
        let promise1 = q.defer().promise;
        let promise2 = q.resolve(42);
        let promise3 = q.reject(new Error('test'));
        
        // All promises should return the same toString value
        assert.strictEqual(promise1.toString(), "[object Promise]");
        assert.strictEqual(promise2.toString(), "[object Promise]");
        assert.strictEqual(promise3.toString(), "[object Promise]");
        done();
    });

    })