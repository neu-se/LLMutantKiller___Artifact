let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.rawListeners - returns empty array for non-existent event', function(done) {
        let db = dirty();
        let rawListeners = db.rawListeners('nonExistentEvent');
        assert(Array.isArray(rawListeners), 'rawListeners should return an array');
        assert.strictEqual(rawListeners.length, 0, 'should return empty array for non-existent event');
        done();
    });

    })