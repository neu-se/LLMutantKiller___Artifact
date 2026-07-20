let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.update - basic update with existing key', function(done) {
        let db = dirty();
        
        // Set initial value
        db.set('counter', 5);
        
        // Update the value using updater function
        db.update('counter', function(value) {
            return value + 10;
        }, function(err) {
            assert.ifError(err);
            assert.equal(db.get('counter'), 15);
            done();
        });
    });
    
    })