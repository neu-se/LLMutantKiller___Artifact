let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('multi-test', function(done) {
        let results = [];
        let db = dirty();
        
        // Add regular listeners
        db.on('test', function() {
            results.push('listener1');
        });
        
        db.on('test', function() {
            results.push('listener2');
        });
        
        // Add prepended once listeners
        db.prependOnceListener('test', function() {
            results.push('prepended-once1');
        });
        
        db.prependOnceListener('test', function() {
            results.push('prepended-once2');
        });
        
        // First emission
        db.em    })
})