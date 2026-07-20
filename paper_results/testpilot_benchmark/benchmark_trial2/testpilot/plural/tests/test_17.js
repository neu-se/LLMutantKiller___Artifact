let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with simple word ending', function(done) {
        // Add a rule for words ending in 'y' -> 'ies'
        plural.addRule(/y$/, 'ies');
        
        // Test that the rule works
        let result = plural('city');
        assert.equal(result, 'cities');
        
        done();
    });
});