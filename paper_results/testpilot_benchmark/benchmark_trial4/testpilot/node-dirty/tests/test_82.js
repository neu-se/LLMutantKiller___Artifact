let mocha = require('mocha');
let assert = require('assert');
let { EventEmitter } = require('events');

describe('test dirty', function() {
    it('test EventEmitter - once method', function(done) {
        let db = new EventEmitter();
        let callCount = 0;

        db.once('once-test', function() {
            callCount++;
            assert.equal(callCount, 1);
            done();
        });

        // Emit the event once
        db.em    })
})