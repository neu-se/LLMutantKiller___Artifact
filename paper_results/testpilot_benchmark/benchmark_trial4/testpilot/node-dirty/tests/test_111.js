let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    describe('dirty.Dirty.EventEmitter.EventEmitterAsyncResource.init', function() {
        
        it('should initialize with empty options object', function(done) {
            try {
                let emitter = new dirty.Dirty.EventEmitter.EventEmitterAsyncResource();
                let result = emitter.in