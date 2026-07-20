let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.eventNames', function(done) {
        // Test 1: eventNames() returns empty array when no events are registered
        let emitter1 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'test-emitter-1' });
        let names1 = emitter1.eventNames();
        assert(Array.isArray(names1), 'eventNames should return an array');
        assert.strictEqual(names1.length, 0, 'eventNames should return empty array when no events');

        // Test 2: eventNames() returns array with event names when events are registered
        let emitter2 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'test-emitter-2' });
        emitter2.on('test-event', function() {});
        emitter2.on('another-event', function() {});
        let names2 = emitter2.eventNames();
        assert(Array.isArray(names2), 'eventNames should return an array');
        assert.strictEqual(names2.length, 2, 'eventNames should return array with 2 event names');
        assert(names2.includes('test-event'), 'eventNames should include test-event');
        assert(names2.includes('another-event'), 'eventNames should include another-event');

        // Test 3: eventNames() returns correct names after removing an event
        let emitter3 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'test-emitter-3' });
        let handler = function() {};
        emitter3.on('event1', handler);
        emitter3.on('event2', handler);
        emitter3.removeListener('event1', handler);
        let names3 = emitter3.eventNames();
        assert(Array.isArray(names3), 'eventNames should return an array');
        assert.strictEqual(names3.length, 1, 'eventNames should return array with 1 event name after removal');
        assert(names3.includes('event2'), 'eventNames should include event2');
        assert(!names3.includes('event1'), 'eventNames should not include removed event1');

        // Test 4: eventNames() handles symbol event names
        let emitter4 = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({ name: 'test-emitter-4' });
        let symbolEvent = Symbol('test-symbol');
        emitter4.on(symbolEvent, function() {});
        emitter4.on('string-event', function() {});
        let names4 = emitter4.eventNames();
        assert(Array.isArray(names4), 'eventNames should return an array');
        assert.strictEqual(names4.length, 2, 'eventNames should return array with 2 event names including symbol');
        assert(names4.includes(symbolEvent), 'eventNames should include symbol event');
        assert(names4.includes('string-event'), 'eventNames should include string event');

        done();
    });
});