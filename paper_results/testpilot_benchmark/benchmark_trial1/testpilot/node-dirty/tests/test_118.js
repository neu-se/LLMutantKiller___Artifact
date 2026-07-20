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
        if (db) {
            db.close();
        }
    });

    it('should return default max listeners value', function(done) {
        try {
            const maxListeners = db.getMaxListeners();
            // Default max listeners is typically 10 in Node.js EventEmitter
            assert.strictEqual(typeof maxListeners, 'number');
            assert(maxListeners >= 0, 'Max listeners should be non-negative');
            done();
        } catch (error) {
            done(error);
        }
    });

    })