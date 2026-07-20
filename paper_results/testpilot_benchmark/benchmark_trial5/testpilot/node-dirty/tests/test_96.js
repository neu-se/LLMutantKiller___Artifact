let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should allow multiple initializations', function(done) {
            try {
                let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                
                // First initialization
                emitter.in