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
                name: 'test-emitter'
            });
        });

        afterEach(function() {
            if (db) {
                db.close();
            }
        });

        it('should work when called multiple times', function(done) {
            let destroyCount = 0;
            
            eventEmitter.on('destroy', function() {
                destroyCount++;
            });

            eventEmitter.emitDestroy();
            eventEmitter.emitDestroy();
            
            setTimeout(function() {
                assert.strictEqual(destroyCount, 2, 'destroy event should be emitted twice');
                done();
            }, 10);
        });

    })
})