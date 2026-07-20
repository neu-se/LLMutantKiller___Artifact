let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should handle invalid option types', function(done) {
            try {
                let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                
                // Test with various invalid types
                let invalidOpts = [
                    'string',
                    123,
                    true,
                    []
                ];
                
                invalidOpts.forEach(opts => {
                    try {
                        emitter.in