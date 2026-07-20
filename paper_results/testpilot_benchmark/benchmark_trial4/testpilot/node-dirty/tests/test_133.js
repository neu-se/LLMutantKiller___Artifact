let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should function as an EventEmitter', function() {
            // Create a dirty database instance
            let db = dirty();
            
            // Test that it still functions as an EventEmitter
            let eventFired = false;
            db.on('test', function() {
                eventFired = true;
            });
            
            db.em})    })
})