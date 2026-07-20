let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener - returns emitter', function(done) {
        let db = dirty();
        
        let result = db.prependListener('return-test', function() {});
        
        // prependListener should return the emitter for chaining
        assert.strictEqual(result, db);
        done();
    });

    })