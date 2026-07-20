let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should initialize with custom options', function(done) {
            try {
                let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                let opts = {
                    name: 'test-emitter',
                    triggerAsyncId: 1,
                    requireManualDestroy: false
                };
                
                let result = emitter.in