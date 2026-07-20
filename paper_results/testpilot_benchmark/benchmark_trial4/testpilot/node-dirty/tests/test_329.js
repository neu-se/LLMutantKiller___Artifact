let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.close - should wait for drain when queue has items', function(done) {
        let db = dirty();
        
        // Mock the queue to have items
        db._queue = new Set(['item1', 'item2']);
        db._inFlightWrites = 0;
        
        let drainEmitted = false;
        let closeStarted = false;
        
        // Set up the drain event to be emitted after a short delay
        setTimeout(() => {
            db._queue.clear();
            drainEmitted = true;
            db.em})    })
})