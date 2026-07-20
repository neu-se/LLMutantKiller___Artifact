let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.isFulfilled - should return true for promise resolved with Q.resolve', function(done) {
        let promise = q.resolve('immediate value');
        
        setImmediate(() => {
            assert.strictEqual(promise.isFulfilled(), true);
            done();
        });
    });
    
    })