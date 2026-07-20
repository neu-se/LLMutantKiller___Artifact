let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test-event', 'second-data');
            
            // Give a small delay to ensure the second emit doesn't trigger
            setTimeout(() => {
                assert.strictEqual(eventFired, true);
                done();
            }, 10);
        });
        
        // Emit the event
        db.em