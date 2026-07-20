let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter multiple listeners', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let listener1Called = false;
        let listener2Called = false;
        
        // Add multiple listeners
        db.on('multi-event', function() {
            listener1Called = true;
        });
        
        db.on('multi-event', function() {
            listener2Called = true;
        });
        
        // Emit event
        db.em    })
})