let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.close - should wait for drain when in-flight writes exist', function(done) {
        let db = dirty();
        
        // Mock in-flight writes
        db._queue = new Set();
        db._inFlightWrites = 2;
        
        let drainEmitted = false;
        
        // Set up the drain event to be emitted after clearing in-flight writes
        setTimeout(() => {
            db._inFlightWrites = 0;
            drainEmitted = true;
            db.em})    })
})