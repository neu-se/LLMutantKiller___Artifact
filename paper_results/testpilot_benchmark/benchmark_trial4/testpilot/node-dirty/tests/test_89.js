let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter - with options', function(done) {
        let opts = { maxListeners: 20 };
        let db = dirty();
        if (db.setMaxListeners) {
            db.setMaxListeners(opts.maxListeners);
        }
        assert(db, 'EventEmitter should be created with options');
        done();
    });
});