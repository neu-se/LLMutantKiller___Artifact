let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should emit test event', function() {
            let eventFired = false;
            let emitter = new (require('events').EventEmitter)();
            
            emitter.on('test-event', function() {
                eventFired = true;
            });
            
            emitter.em})    })
})