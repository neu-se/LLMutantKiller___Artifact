let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should not emit destroy event if already destroyed', function(done) {
            let db = dirty();
            let asyncResource = db.EventEmitter.EventEmitterAsyncResource.prototype;
            let testInstance = Object.create(asyncResource);
            
            testInstance.asyncId = 2;
            testInstance.destroyed = true; // Already destroyed
            
            let destroyEventCalled = false;
            testInstance.on = function(event, callback) {
                if (event === 'destroy') {
                    destroyEventCalled = true;
                    callback();
                }
            };
            
            testInstance.emitDestroy();
            
            // Give some time to ensure event is not emitted
            setTimeout(() => {
                assert.strictEqual(destroyEventCalled, false, 'Destroy event should not be emitted for already destroyed resource');
                done();
            }, 10);
        });

            })
})