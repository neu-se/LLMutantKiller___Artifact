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

    it('should initialize with custom options', function(done) {
        try {
            let opts = {
                name: 'test-resource',
                triggerAsyncId: 1,
                requireManualDestroy: false
            };
            let result = eventEmitter.in