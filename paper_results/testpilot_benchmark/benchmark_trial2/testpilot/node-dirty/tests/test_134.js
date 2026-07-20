let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'test-data');
            
            // Use setTimeout to ensure the second emit doesn't trigger the listener
            setTimeout(() => {
                assert.strictEqual(callCount, 1);
                done();
            }, 10);
        };
        
        // Test prependOnceListener
        db.prependOnceListener('test-event', listener);
        
        // Emit the event
        db.em