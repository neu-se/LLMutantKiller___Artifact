let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');
let EventEmitter = require('events');

describe('test dirty', function() {
    it(testEvent);
        
        // Give some time for events to process
        setTimeout(() => {
            assert.strictEqual(callCount, 2); // Should be called twice since we're testing the setup
            done();
        }, 10);
    });