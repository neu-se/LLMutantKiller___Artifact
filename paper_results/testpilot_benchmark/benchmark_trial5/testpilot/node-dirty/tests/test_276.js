let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - no listeners', function(done) {
        let db = dirty();
        
        // This should not throw an error even with no listeners
        try {
            db.em