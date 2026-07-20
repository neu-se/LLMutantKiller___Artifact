let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
        // Apply the monkey patch
        plural.monkeyPatch();
        
        // Test singular form with count 1
        assert.equal('zebra'.plural(1), 'zebra');
        assert.equal('cat'.plural(1), 'cat');
        assert.equal('dog'.plural(1), 'dog');
        
        // Test plural form with count > 1
        assert.equal('zebra'.plural(2), 'zebras');
        assert.equal('cat'.plural(3), 'cats');
        assert.equal('dog'.plural(5), 'dogs');
        
        // Test plural form with count 0
        assert.equal('zebra'.plural(0), 'zebras');
        assert.equal('cat'.plural(0), 'cats');
        
        // Test default behavior (no argument should return plural)
        assert.equal('zebra'.plural(), 'zebras');
        assert.equal('cat'.plural(), 'cats');
        assert.equal('dog'.plural(), 'dogs');
        
        // Test irregular plurals if supported
        assert.equal('child'.plural(1), 'child');
        assert.equal('child'.plural(2), 'children');
        
        done();
    });
    
    })