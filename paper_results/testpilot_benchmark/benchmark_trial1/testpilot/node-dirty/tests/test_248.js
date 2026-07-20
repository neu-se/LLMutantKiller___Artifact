let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - basic event emission', function(done) {
        let db = dirty();
        let eventFired = false;
        
        db.on('test-event', function() {
            eventFired = true;
        });
        
        db.em    })
})