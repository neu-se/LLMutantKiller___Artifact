let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        // Create a new in-memory dirty database for each test
        db = dirty();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('shared-event');
        
        setTimeout(() => {
            assert.strictEqual(listener1Called, true, 'First listener should be called');
            assert.strictEqual(listener2Called, true, 'Second listener should be called');
            assert.strictEqual(callCount, 2, 'Both listeners should be called');
            done();
        }, 10);
    });