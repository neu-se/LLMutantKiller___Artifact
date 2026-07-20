let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should handle falsy nodeback parameter', function() {
            let promise = q.resolve('test value');
            let result = promise.nodeify(null);
            
            assert.strictEqual(result, promise);
        });
        
            })
})