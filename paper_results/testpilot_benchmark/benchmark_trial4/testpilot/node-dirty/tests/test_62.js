let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('should work with dirty module', function() {
        // Add actual test implementation here
        assert.ok(dirty);
    });
});