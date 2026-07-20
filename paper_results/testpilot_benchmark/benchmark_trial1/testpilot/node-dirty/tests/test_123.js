let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.addListener - multiple listeners', function(done) {
        let db = dirty();
        let eventEmitter = db;
        
        let listener1Called = false;
        let listener2Called = false;
        
        let listener1 = function() {
            listener1Called = true;
        };
        
        let listener2 = function() {
            listener2Called = true;
        };
        
        // Add multiple listeners for the same event
        eventEmitter.addListener('multi-event', listener1);
        eventEmitter.addListener('multi-event', listener2);
        
        // Emit the event
        eventEmitter.em    })
})