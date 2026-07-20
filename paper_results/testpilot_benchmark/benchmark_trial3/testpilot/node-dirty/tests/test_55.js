let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test');
        
        // Give it a moment to potentially call the listener
        setTimeout(function() {
            assert.equal(called, false);
            done();
        }, 10);
    });