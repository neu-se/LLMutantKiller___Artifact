let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.setMaxListeners', function(done) {
        // Test 1: Set a valid positive number
        let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        let result = emitter.setMaxListeners(10);
        
        assert.strictEqual(emitter._maxListeners, 10, 'Should set _maxListeners to 10');
        assert.strictEqual(result, emitter, 'Should return the emitter instance for chaining');
        
        // Test 2: Set zero as max listeners
        emitter.setMaxListeners(0);
        assert.strictEqual(emitter._maxListeners, 0, 'Should set _maxListeners to 0');
        
        // Test 3: Set a large number
        emitter.setMaxListeners(1000);
        assert.strictEqual(emitter._maxListeners, 1000, 'Should set _maxListeners to 1000');
        
        // Test 4: Test method chaining
        let chainResult = emitter.setMaxListeners(5).setMaxListeners(15);
        assert.strictEqual(emitter._maxListeners, 15, 'Should allow method chaining');
        assert.strictEqual(chainResult, emitter, 'Chained calls should return the same instance');
        
        // Test 5: Test that invalid inputs throw errors
        try {
            emitter.setMaxListeners(-1);
            assert.fail('Should throw error for negative number');
        } catch (error) {
            assert.ok(error, 'Should throw error for negative number');
        }
        
        try {
            emitter.setMaxListeners('invalid');
            assert.fail('Should throw error for non-number input');
        } catch (error) {
            assert.ok(error, 'Should throw error for non-number input');
        }
        
        try {
            emitter.setMaxListeners(null);
            assert.fail('Should throw error for null input');
        } catch (error) {
            assert.ok(error, 'Should throw error for null input');
        }
        
        try {
            emitter.setMaxListeners(undefined);
            assert.fail('Should throw error for undefined input');
        } catch (error) {
            assert.ok(error, 'Should throw error for undefined input');
        }
        
        done();
    });
});