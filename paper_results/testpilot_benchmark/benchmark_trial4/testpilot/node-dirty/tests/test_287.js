let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - no listeners', function(done) {
        let db = dirty();
        
        // Should not throw error when emitting event with no listeners
        try {
            db.em