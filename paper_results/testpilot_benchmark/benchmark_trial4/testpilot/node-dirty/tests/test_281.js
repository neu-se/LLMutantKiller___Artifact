let mocha = require('mocha');
let assert = require('assert');
let { EventEmitterAsyncResource } = require('events');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emitDestroy', function() {
        
        it('should emit destroy event when emitDestroy is called', function(done) {
            // Create an EventEmitterAsyncResource instance directly
            let asyncResource = new EventEmitterAsyncResource({
                name: 'test-resource'
            });
            
            // Set up the destroy event listener
            asyncResource.on('destroy', function() {
                done();
            });
            
            // Call emitDestroy
            asyncResource.emitDestroy();
        });
    });
});