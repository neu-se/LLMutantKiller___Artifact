let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init - with captureRejections true', function(done) {
        const instance = Object.create(dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype);
        
        // Call init with captureRejections option
        dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init.call(instance, { captureRejections: true });
        
        // Verify captureRejections is set
        assert.strictEqual(instance._events.__proto__, null);
        assert.strictEqual(instance._eventsCount, 0);
        
        done();
    });

    })