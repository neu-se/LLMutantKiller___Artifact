let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - once method', function(done) {
        let db = dirty.Dirty.EventEmitter();
        let callCount = 0;

        db.once('once-test', function() {
            callCount++;
        });

        db.em    })
})