let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - null values', function(done) {
        let promise1 = q.resolve(null);
        let promise2 = q.resolve(null);
        
        promise1.join(promise2)
            .then(function(result) {
                assert.strictEqual(result, null);
                done();
            })
            .catch(done);
    });

    })