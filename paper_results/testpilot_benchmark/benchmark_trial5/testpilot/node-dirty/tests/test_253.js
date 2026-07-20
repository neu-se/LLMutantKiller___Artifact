let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let { AsyncResource } = require('async_hooks');

describe('test dirty', function() {
    it('should emit events through EventEmitterAsyncResource', function(done) {
        // Create a simple dirty database instance
        const db = dirty();
        
        // Listen for the 'load' event which is emitted when the database is ready
        db.on('load', () => {
            // Set a value to trigger a 'drain' event
            db.set('test-key', 'test-data');
        });
        
        // Listen for the 'drain' event which is emitted after writes
        db.on('drain', () => {
            const data = db.get('test-key');
            assert.strictEqual(data, 'test-data');
            done();
        });
    });
});