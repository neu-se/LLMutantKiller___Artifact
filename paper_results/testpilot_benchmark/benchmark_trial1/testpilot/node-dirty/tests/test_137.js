let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependListener returns the EventEmitter instance', function(done) {
        let db = dirty();
        
        let result = db.prependListener('return-test', function() {});
        
        assert.strictEqual(result, db);
        
        done();
    });
});