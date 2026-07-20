let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependOnceListener - return value', function(done) {
        let db = dirty();
        
        let listener = function() {};
        let returnValue = db.prependOnceListener('return-test', listener);
        
        // prependOnceListener should return the EventEmitter instance
        assert.strictEqual(returnValue, db);
        done();
    });
});