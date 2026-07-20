let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should mark resource as destroyed after emitDestroy', function(done) {
            let db = dirty();
            let asyncResource = db.EventEmitter.EventEmitterAsyncResource.prototype;
            let testInstance = Object.create(asyncResource);
            
            testInstance.asyncId = 3;
            testInstance.destroyed = false;
            
            testInstance.on = function(event, callback) {
                if (event === 'destroy') {
                    callback();
                }
            };
            
            // Mock the destroyed property setter
            Object.defineProperty(testInstance, 'destroyed', {
                writable: true,
                value: false
            });
            
            testInstance.emitDestroy();
            
            setImmediate(() => {
                assert.strictEqual(testInstance.destroyed, true, 'Resource should be marked as destroyed');
                done();
            });
        });

            })
})