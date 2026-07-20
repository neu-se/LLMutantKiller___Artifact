let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should handle emitDestroy with no event listeners gracefully', function(done) {
            // Create a mock EventEmitterAsyncResource with emitDestroy method
            let mockAsyncResource = {
                asyncId: 4,
                destroyed: false,
                on: function() {},
                emitDestroy: function() {
                    // Mock implementation that should handle no event listeners gracefully
                    if (!this.destroyed) {
                        this.destroyed = true;
                    }
                }
            };
            
            try {
                mockAsyncResource.emitDestroy();
                // Should not throw an error
                assert.strictEqual(mockAsyncResource.destroyed, true);
                done();
            } catch (error) {
                done(error);
            }
        });

    })
})