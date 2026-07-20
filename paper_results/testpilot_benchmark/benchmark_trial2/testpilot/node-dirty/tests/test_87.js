let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init - with captureRejections false', function(done) {
        const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
        
        // Call init with captureRejections false
        dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, { captureRejections: false });
        
        // Verify basic properties are set
        assert.strictEqual(typeof instance._events, 'object');
        assert.strictEqual(instance._eventsCount, 0);
        
        done();
    });

    })