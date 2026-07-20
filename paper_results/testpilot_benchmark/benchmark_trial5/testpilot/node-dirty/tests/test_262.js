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
            // Access the EventEmitterAsyncResource instance
            eventEmitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
        });

        afterEach(function() {
            if (db) {
                db.close();
            }
        });

        it('should handle multiple destroy event listeners', function(done) {
            let listener1Called = false;
            let listener2Called = false;
            
            eventEmitter.on('destroy', function() {
                listener1Called = true;
            });
            
            eventEmitter.on('destroy', function() {
                listener2Called = true;
            });

            eventEmitter.emitDestroy();
            
            setTimeout(function() {
                assert.strictEqual(listener1Called, true, 'first destroy listener should be called');
                assert.strictEqual(listener2Called, true, 'second destroy listener should be called');
                done();
            }, 10);
        });

            })
})