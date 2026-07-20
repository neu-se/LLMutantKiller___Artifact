let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.prototype.emit - multiple listeners', function(done) {
        let db = dirty();
        let listener1Called = false;
        let listener2Called = false;
        
        db.on('shared-event', function(data) {
            listener1Called = true;
            assert.equal(data, 'shared-data');
        });
        
        db.on('shared-event', function(data) {
            listener2Called = true;
            assert.equal(data, 'shared-data');
            
            // Check both listeners were called
            assert.equal(listener1Called, true);
            assert.equal(listener2Called, true);
            done();
        });
        
        db.em    })
})