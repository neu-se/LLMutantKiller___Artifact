let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter with custom options', function(done) {
        let opts = { path: ':memory:' };
        let db = dirty(opts.path);
        
        // Test that it accepts options and has EventEmitter methods
        assert(typeof db.on === 'function', 'Should have on method');
        assert(typeof db.emit === 'function', 'Should have emit method');
        
        done();
    });
});