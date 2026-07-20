let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.nextTick with no arguments', function(done) {
        // Test that nextTick works even with an empty function
        q.nextTick(function() {
            // Just verify this executes
            assert.ok(true);
            done();
        });
    });
});