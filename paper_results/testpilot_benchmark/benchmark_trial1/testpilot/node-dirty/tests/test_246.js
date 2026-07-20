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

        it('should call emitDestroy without throwing errors', function() {
            assert.doesNotThrow(function() {
                eventEmitter.emitDestroy();
            }, 'emitDestroy should not throw any errors');
        });

    })
})