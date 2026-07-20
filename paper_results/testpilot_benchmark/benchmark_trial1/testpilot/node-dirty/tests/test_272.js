let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.get - should return value for existing key', function(done) {
        let db = dirty();
        
        // Set a value first
        db.set('testKey', 'testValue');
        
        // Test getting the value
        let result = db.get('testKey');
        assert.strictEqual(result, 'testValue');
        done();
    });
    
    })