let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.nodeify', function() {
        
        it('should return undefined when nodeback is provided', function() {
            let promise = q.resolve('test value');
            let result = promise.nodeify(function() {});
            
            assert.strictEqual(result, undefined);
        });
        
            })
})