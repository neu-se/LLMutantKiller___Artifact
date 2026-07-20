let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.delete with different key types', function(done) {
        let mockPromise = Object.create(q.makePromise.prototype);
        let capturedArgs = [];
        
        mockPromise.dispatch = function(method, args) {
            capturedArgs.push(args);
            return q.resolve();
        };
        
        // Test with string key
        mockPromise.delete('string_key');
        
        // Test with number key
        mockPromise.delete(123);
        
        // Test with null key
        mockPromise.delete(null);
        
        // Test with undefined key
        mockPromise.delete(undefined);
        
        // Verify all calls were made with correct arguments
        assert.deepStrictEqual(capturedArgs[0], ['string_key']);
        assert.deepStrictEqual(capturedArgs[1], [123]);
        assert.deepStrictEqual(capturedArgs[2], [null]);
        assert.deepStrictEqual(capturedArgs[3], [undefined]);
        
        done();
    });
    
    })