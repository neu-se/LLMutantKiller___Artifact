let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should handle complex options object', function(done) {
            try {
                let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                let complexOpts = {
                    name: 'complex-emitter',
                    triggerAsyncId: 42,
                    requireManualDestroy: true,
                    customProperty: 'test-value',
                    nested: {
                        property: 'nested-value'
                    }
                };
                
                let result = emitter.in