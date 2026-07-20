let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let eventEmitter;
    
    beforeEach(function() {
        // Create a fresh instance for each test
        eventEmitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (eventEmitter && typeof eventEmitter.destroy === 'function') {
            eventEmitter.destroy();
        }
        eventEmitter = null;
    });

    it('test-event');
            
            // Give it a moment for async operations
            setTimeout(function() {
                assert.ok(eventFired, 'EventEmitter should still work after init');
                done();
            }, 10);
        } catch (error) {
            done(error);
        }
    });

    