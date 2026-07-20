let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - non-existent event', function(done) {
        let db = dirty();
        
        // Should not throw an error when emitting an event with no listeners
        assert.doesNotThrow(function() {
            db.em})    })
})