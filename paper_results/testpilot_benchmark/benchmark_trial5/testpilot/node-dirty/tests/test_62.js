let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test EventEmitter multiple listeners', function(done) {
        let db = new EventEmitter();
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