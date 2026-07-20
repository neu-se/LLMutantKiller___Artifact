let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - multiple listeners', function(done) {
        let db = dirty();
        let listener1Called = false;
        let listener2Called = false;
        
        db.on('multi-listener', function() {
            listener1Called = true;
        });
        
        db.on('multi-listener', function() {
            listener2Called = true;
        });
        
        // Emit the event to trigger both listeners
        db.em    })
})