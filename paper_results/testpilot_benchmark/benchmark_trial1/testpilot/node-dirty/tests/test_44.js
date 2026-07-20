let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - basic instantiation', function(done) {
        let db = dirty.Dirty.EventEmitter();
        assert(db, 'EventEmitter should be created');
        assert.strictEqual(typeof db.on, 'function', 'Should have on method');
        assert.strictEqual(typeof db.emit, 'function', 'Should have emit method');
        assert.strictEqual(typeof db.removeListener, 'function', 'Should have removeListener method');
        done();
    });

    })