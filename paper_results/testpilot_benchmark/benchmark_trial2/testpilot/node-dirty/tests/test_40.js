let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter constructor', function(done) {
        // Test that EventEmitter can be instantiated
        let emitter = new dirty.Dirty.EventEmitter();
        assert(emitter instanceof dirty.Dirty.EventEmitter, 'Should create an instance of EventEmitter');
        done();
    });

    })