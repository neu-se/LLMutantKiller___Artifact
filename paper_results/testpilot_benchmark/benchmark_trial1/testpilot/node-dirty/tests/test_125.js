let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.addListener - return value', function(done) {
        let db = dirty();
        let eventEmitter = db;
        
        let testListener = function() {};
        
        // Test that addListener returns the EventEmitter instance (for chaining)
        let result = eventEmitter.addListener('return-test', testListener);
        
        // Verify it returns the same instance
        assert.equal(result, eventEmitter);
        done();
    });

    })