let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test dirty.Dirty.EventEmitter.EventEmitterAsyncResource.prototype.prependListener - multiple prepends', function(done) {
        let db = dirty();
        let callOrder = [];
        
        // Add initial listener
        db.on('multi-test', function() {
            callOrder.push('last');
        });
        
        // Prepend multiple listeners
        db.prependListener('multi-test', function() {
            callOrder.push('second');
        });
        
        db.prependListener('multi-test', function() {
            callOrder.push('first');
        });
        
        db.em    })
})