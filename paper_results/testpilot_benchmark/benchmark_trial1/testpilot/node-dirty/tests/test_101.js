let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    let eventEmitter;
    
    beforeEach(function() {
        // Create a fresh instance for each test
        eventEmitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
    });
    
    afterEach(function() {
        // Clean up after each test
        if (eventEmitter && typeof eventEmitter.destroy === 'function') {
            eventEmitter.destroy();
        }
        eventEmitter = null;
    });

    it('should handle options with invalid properties', function(done) {
        try {
            let opts = {
                invalidProperty: 'invalid',
                anotherInvalid: 123,
                type: 'valid-type'
            };
            let result = eventEmitter.in