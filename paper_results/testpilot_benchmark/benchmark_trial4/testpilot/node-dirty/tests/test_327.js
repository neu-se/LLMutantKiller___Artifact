let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.close - should close streams immediately when no pending operations', function(done) {
        let db = dirty();
        
        // No pending operations
        db._queue = new Set();
        db._inFlightWrites = 0;
        
        // Mock streams
        let readStreamDestroyed = false;
        let writeStreamDestroyed = false;
        let writeStreamEnded = false;
        
        db._readStream = {
            destroy: () => { readStreamDestroyed = true; }
        };
        db._writeStream = {
            end: (callback) => { 
                writeStreamEnded = true;
                if (callback) callback();
            },
            destroy: () => { writeStreamDestroyed = true; }
        };
        
        db.close();
        
        // Verify streams were closed immediately
        assert.strictEqual(readStreamDestroyed, true);
        assert.strictEqual(writeStreamEnded, true);
        assert.strictEqual(writeStreamDestroyed, true);
        done();
    });

    })