let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.prototype.forEach with empty database', function(done) {
        let db = dirty();
        let count = 0;
        
        db.forEach(function(key, val) {
            count++;
        });
        
        assert.equal(count, 0);
        done();
    });
    
    })