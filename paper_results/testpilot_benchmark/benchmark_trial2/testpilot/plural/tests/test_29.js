let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
        // Apply the monkey patch
        plural.monkeyPatch();
        
        // Test singular form (count = 1)
        assert.equal('zebra'.plural(1), 'zebra');
        assert.equal('cat'.plural(1), 'cat');
        assert.equal('dog'.plural(1), 'dog');
        
        // Test plural form (count > 1)
        assert.equal('zebra'.plural(2), 'zebras');
        assert.equal('cat'.plural(3), 'cats');
        assert.equal('dog'.plural(0), 'dogs');
        
        // Test default behavior (no argument should default to plural)
        assert.equal('zebra'.plural(), 'zebras');
        assert.equal('cat'.plural(), 'cats');
        assert.equal('dog'.plural(), 'dogs');
        
        // Test edge cases
        assert.equal('box'.plural(1), 'box');
        assert.equal('box'.plural(2), 'boxes');
        assert.equal('child'.plural(1), 'child');
        assert.equal('child'.plural(2), 'children');
        
        done();
    });
    
    })