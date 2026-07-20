let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.get with different key types', function(done) {
        let deferred = q.defer();
        let promise = deferred.promise;
        
        let callCount = 0;
        let capturedKeys = [];
        
        promise.dispatch = function(method, args) {
            callCount++;
            capturedKeys.push(args[0]);
            return q.resolve('result');
        };
        
        // Test with string key
        promise.get('stringKey');
        
        // Test with number key
        promise.get(42);
        
        // Test with null key
        promise.get(null);
        
        // Test with undefined key
        promise.get(undefined);
        
        assert.strictEqual(callCount, 4, 'dispatch should be called 4 times');
        assert.deepStrictEqual(capturedKeys, ['stringKey', 42, null, undefined], 'all key types should be passed correctly');
        
        done();
    });
    
    })