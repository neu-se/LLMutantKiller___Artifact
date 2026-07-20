let assert = require('assert');
let q = require('q');

describe('test q', function() {
    describe('q.makePromise.prototype.finally', function() {
        
        it('should throw error if callback is not a function', function() {
            let promise = q.resolve('test');
            
            assert.throws(function() {
                promise.finally('not a function');
            }, /Q can't apply finally callback/);
            
            assert.throws(function() {
                promise.finally(null);
            }, /Q can't apply finally callback/);
            
            assert.throws(function() {
                promise.finally(undefined);
            }, /Q can't apply finally callback/);
        });

    });
});