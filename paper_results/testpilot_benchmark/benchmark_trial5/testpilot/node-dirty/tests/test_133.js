let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener - return value', function(done) {
        let db = dirty();
        
        let listener = function() {};
        let result = db.prependListener('return-test', listener);
        
        // prependListener should return the EventEmitter instance
        assert.strictEqual(result, db);
        done();
    });

    })