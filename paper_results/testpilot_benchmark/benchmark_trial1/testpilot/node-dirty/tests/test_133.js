let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependListener with multiple prepended listeners', function(done) {
        let db = dirty();
        let callOrder = [];
        
        // Add a regular listener
        db.on('multi-test', function() {
            callOrder.push('last');
        });
        
        // Prepend first listener
        db.prependListener('multi-test', function() {
            callOrder.push('second');
        });
        
        // Prepend another listener - this should be first
        db.prependListener('multi-test', function() {
            callOrder.push('first');
        });
        
        db.em    })
})