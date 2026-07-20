let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependOnceListener return value', function(done) {
        let db = dirty();
        
        function testListener() {
            // Test listener function
        }
        
        // prependOnceListener should return the EventEmitter instance for chaining
        let returnValue = db.prependOnceListener('return-test', testListener);
        
        assert.strictEqual(returnValue, db, 'prependOnceListener should return the EventEmitter instance');
        
        done();
    });
});