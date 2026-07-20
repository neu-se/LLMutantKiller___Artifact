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

    it({ type: 'second' });
            
            assert.ok(result1 !== undefined, 'first init should succeed');
            assert.ok(result2 !== undefined, 'second init should succeed');
            done();
        } catch (error) {
            done(error);
        }
    });

    