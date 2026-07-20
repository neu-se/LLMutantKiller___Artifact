let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.listenerCount', function(done) {
        // Create an instance of EventEmitterAsyncResource with required options
        const emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
            name: 'test-emitter'
        });
        
        // Test 1: No events registered - should return 0
        assert.strictEqual(emitter.listenerCount('test'), 0);
        assert.strictEqual(emitter.listenerCount('test', function() {}), 0);
        
        // Test 2: Single function listener
        const listener1 = function() { console.log('listener1'); };
        emitter.on('test', listener1);
        
        assert.strictEqual(emitter.listenerCount('test'), 1);
        assert.strictEqual(emitter.listenerCount('test', listener1), 1);
        assert.strictEqual(emitter.listenerCount('test', function() {}), 0);
        
        // Test 3: Multiple listeners
        const listener2 = function() { console.log('listener2'); };
        const listener3 = function() { console.log('listener3'); };
        emitter.on('test', listener2);
        emitter.on('test', listener3);
        
        assert.strictEqual(emitter.listenerCount('test'), 3);
        assert.strictEqual(emitter.listenerCount('test', listener1), 1);
        assert.strictEqual(emitter.listenerCount('test', listener2), 1);
        assert.strictEqual(emitter.listenerCount('test', listener3), 1);
        
        // Test 4: Same listener added multiple times
        emitter.on('test', listener1);
        assert.strictEqual(emitter.listenerCount('test'), 4);
        assert.strictEqual(emitter.listenerCount('test', listener1), 2);
        
        // Test 5: Different event type
        emitter.on('other', listener1);
        assert.strictEqual(emitter.listenerCount('other'), 1);
        assert.strictEqual(emitter.listenerCount('other', listener1), 1);
        assert.strictEqual(emitter.listenerCount('test'), 4); // Should not affect 'test' count
        
        // Test 6: Test with wrapped listeners (once listeners)
        const onceListener = function() { console.log('once'); };
        emitter.once('once-test', onceListener);
        assert.strictEqual(emitter.listenerCount('once-test'), 1);
        assert.strictEqual(emitter.listenerCount('once-test', onceListener), 1);
        
        // Test 7: Non-existent event type
        assert.strictEqual(emitter.listenerCount('nonexistent'), 0);
        assert.strictEqual(emitter.listenerCount('nonexistent', listener1), 0);
        
        // Test 8: Null/undefined listener parameter
        assert.strictEqual(emitter.listenerCount('test', null), 4);
        assert.strictEqual(emitter.listenerCount('test', undefined), 4);
        
        done();
    });
});