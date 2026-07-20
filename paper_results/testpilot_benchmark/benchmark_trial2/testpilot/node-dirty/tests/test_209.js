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
        if (db && typeof db.close === 'function') {
            db.close();
        }
    });

    it('multi-arg-event', 'string', 123, true, { obj: 'value' });
        
        setTimeout(() => {
            assert.strictEqual(receivedArgs.length, 4, 'Should receive 4 arguments');
            assert.strictEqual(receivedArgs[0], 'string');
            assert.strictEqual(receivedArgs[1], 123);
            assert.strictEqual(receivedArgs[2], true);
            assert.deepStrictEqual(receivedArgs[3], { obj: 'value' });
            done();
        }, 10);
    });