let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should handle emitDestroy with no event listeners gracefully', function(done) {
            let db = dirty();
            let asyncResource = db.EventEmitter.EventEmitterAsyncResource.prototype;
            let testInstance = Object.create(asyncResource);
            
            testInstance.asyncId = 4;
            testInstance.destroyed = false;
            
            // No event listeners attached
            testInstance.on = function() {};
            
            try {
                testInstance.emitDestroy();
                // Should not throw an error
                done();
            } catch (error) {
                done(error);
            }
        });

            })
})