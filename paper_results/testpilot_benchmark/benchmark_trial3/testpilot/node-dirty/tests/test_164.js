let mocha = require('mocha');
let assert = require('assert');
let dirty = require('dirty');

describe('test dirty', function() {
    it('test prependOnceListener with multiple listeners', function(done) {
        let db = dirty();
        let results = [];
        
        // Add multiple listeners in different orders
        db.on('multi-test', () => results.push('listener1'));
        db.prependOnceListener('multi-test', () => results.push('prepended-once1'));
        db.on('multi-test', () => results.push('listener2'));
        db.prependOnceListener('multi-test', () => results.push('prepended-once2'));
        
        // Emit event twice
        db.em    })
})