let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should handle multiple emitDestroy calls safely', function(done) {
            let db = dirty();
            let asyncResource = db.EventEmitter.EventEmitterAsyncResource.prototype;
            let testInstance = Object.create(asyncResource);
            
            testInstance.asyncId = 5;
            testInstance.destroyed = false;
            
            let destroyCallCount = 0;
            testInstance.on = function(event, callback) {
                if (event === 'destroy') {
                    destroyCallCount++;
                    callback();
                }
            };
            
            // Call emitDestroy multiple times
            testInstance.emitDestroy();
            testInstance.emitDestroy();
            testInstance.emitDestroy();
            
            setTimeout(() => {
                assert.strictEqual(destroyCallCount, 1, 'Destroy event should only be emitted once');
                done();
            }, 20);
        });
    });
});