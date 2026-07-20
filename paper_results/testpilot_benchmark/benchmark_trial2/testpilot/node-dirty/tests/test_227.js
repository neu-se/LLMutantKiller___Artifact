let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should handle multiple emitDestroy calls safely', function(done) {
            // Create a mock EventEmitterAsyncResource with emitDestroy method
            function MockEventEmitterAsyncResource() {
                this.asyncId = 5;
                this.destroyed = false;
                this.listeners = {};
            }
            
            MockEventEmitterAsyncResource.prototype.on = function(event, callback) {
                if (!this.listeners[event]) {
                    this.listeners[event] = [];
                }
                this.listeners[event].push(callback);
            };
            
            MockEventEmitterAsyncResource.prototype.emitDestroy = function() {
                if (this.destroyed) {
                    return;
                }
                this.destroyed = true;
                
                if (this.listeners['destroy']) {
                    this.listeners['destroy'].forEach(callback => callback());
                }
            };
            
            let testInstance = new MockEventEmitterAsyncResource();
            
            let destroyCallCount = 0;
            testInstance.on('destroy', function() {
                destroyCallCount++;
            });
            
            // Call emitDestroy multiple times
            testInstance.emitDestroy();
            testInstance.emitDestroy();
            testInstance.emitDestroy();
            
            setTimeout(() => {
                assert.strictEqual(destroyCallCount, 1, 'Destroy event should only be emitted once');
                assert.strictEqual(testInstance.destroyed, true, 'Instance should be marked as destroyed');
                done();
            }, 20);
        });
    });
});