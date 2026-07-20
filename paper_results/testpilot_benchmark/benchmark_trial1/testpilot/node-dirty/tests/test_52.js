let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - once listener', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let callCount = 0;

        if (typeof db.once === 'function') {
            db.once('once-test', function() {
                callCount++;
            });

            db.em}    })
})