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
    });

    it('should handle options with various data types', function(done) {
        try {
            let opts = {
                stringProp: 'test',
                numberProp: 42,
                booleanProp: true,
                arrayProp: [1, 2, 3],
                objectProp: { nested: 'value' }
            };
            
            let result = eventEmitter.in