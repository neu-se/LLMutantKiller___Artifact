let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('EventEmitterAsyncResource.prototype.emit', function() {
        
        it('should throw error when kAsyncResource is undefined', function() {
            const EventEmitterAsyncResource = dirty.Dirty.EventEmitter.EventEmitterAsyncResource;
            const emitter = Object.create(EventEmitterAsyncResource.prototype);
            
            assert.throws(() => {
                emitter.em})})    })
})