let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'test-data');
            
            // Use setTimeout to ensure the listener isn't called again
            setTimeout(() => {
                assert.strictEqual(callCount, 1);
                done();
            }, 10);
        };
        
        // Test prependOnceListener
        db.prependOnceListener('test-event', listener);
        
        // Emit the event
        db.em