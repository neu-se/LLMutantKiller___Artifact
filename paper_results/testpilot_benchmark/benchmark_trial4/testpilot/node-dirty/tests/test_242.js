let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let db;
    
    beforeEach(function() {
        // Create a new dirty database instance for each test
        db = dirty();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('should return empty array when no listeners are registered', function() {
        const listeners = db.listeners('test-event');
        assert(Array.isArray(listeners), 'listeners should return an array');
        assert.strictEqual(listeners.length, 0, 'should have no listeners initially');
    });

    })