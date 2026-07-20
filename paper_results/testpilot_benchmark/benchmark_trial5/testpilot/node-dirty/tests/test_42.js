let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it('should test event1', function() {
        let emitter = new EventEmitter();
        // Add your test logic here
        assert.ok(emitter);
    });
});