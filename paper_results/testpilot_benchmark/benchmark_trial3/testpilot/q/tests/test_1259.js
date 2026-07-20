let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should return the promise itself when no nodeback is provided', function() {
            let promise = q.resolve('test value');
            let result = promise.nodeify();
            
            assert.strictEqual(result, promise);
        });
        
            })
})