let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.eventNames', function(done) {
        // Test 1: eventNames() returns empty array when no events are registered
        let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        let names = emitter.eventNames();
        assert(Array.isArray(names), 'eventNames should return an array');
        assert.strictEqual(names.length, 0, 'should return empty array when no events');

        // Test 2: eventNames() returns array with event names after adding listeners
        emitter.on('test1', function() {});
        emitter.on('test2', function() {});
        names = emitter.eventNames();
        assert.strictEqual(names.length, 2, 'should return array with 2 event names');
        assert(names.includes('test1'), 'should include test1 event');
        assert(names.includes('test2'), 'should include test2 event');

        // Test 3: eventNames() returns correct names after removing a listener
        emitter.removeAllListeners('test1');
        names = emitter.eventNames();
        assert.strictEqual(names.length, 1, 'should return array with 1 event name after removal');
        assert(names.includes('test2'), 'should still include test2 event');
        assert(!names.includes('test1'), 'should not include removed test1 event');

        // Test 4: eventNames() returns empty array after removing all listeners
        emitter.removeAllListeners();
        names = emitter.eventNames();
        assert.strictEqual(names.length, 0, 'should return empty array after removing all listeners');

        // Test 5: eventNames() works with symbol event names
        let symbolEvent = Symbol('symbolEvent');
        emitter.on(symbolEvent, function() {});
        emitter.on('stringEvent', function() {});
        names = emitter.eventNames();
        assert.strictEqual(names.length, 2, 'should handle both symbol and string event names');
        assert(names.includes(symbolEvent), 'should include symbol event');
        assert(names.includes('stringEvent'), 'should include string event');

        done();
    });
});