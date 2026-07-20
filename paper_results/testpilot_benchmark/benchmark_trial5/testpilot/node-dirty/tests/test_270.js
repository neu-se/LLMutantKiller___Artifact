let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emitDestroy', function() {
        let db;
        let eventEmitter;

        beforeEach(function() {
            // Create a new dirty database instance for each test
            db = dirty();
            // Access the EventEmitterAsyncResource instance with required options
            eventEmitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource({
                name: 'test-event-emitter'
            });
        });

        afterEach(function() {
            if (db) {
                db.close();
            }
        });

        it('should emit destroy event when emitDestroy is called', function(done) {
            let destroyEventFired = false;
            
            eventEmitter.on('destroy', function() {
                destroyEventFired = true;
            });

            eventEmitter.emitDestroy();
            
            // Give some time for async event to fire
            setTimeout(function() {
                assert.strictEqual(destroyEventFired, true, 'destroy event should have been emitted');
                done();
            }, 10);
        });

    })
})