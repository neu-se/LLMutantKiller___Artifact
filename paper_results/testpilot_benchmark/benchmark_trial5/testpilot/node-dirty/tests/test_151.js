let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.once - returns this for chaining', function(done) {
        let db = dirty();
        
        let result = db.once('chain-test', function() {});
        
        assert.strictEqual(result, db);
        done();
    });

    })