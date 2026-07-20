let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with complex regex pattern', function(done) {
        // Add a rule for words ending in 'f' or 'fe' -> 'ves'
        // Use a capturing group to preserve the beginning of the word
        plural.addRule(/(.*)f(e)?$/, '$1ves');
        
        // Test with 'f' ending
        let result1 = plural('leaf');
        assert.equal(result1, 'leaves');
        
        // Test with 'fe' ending
        let result2 = plural('knife');
        assert.equal(result2, 'knives');
        
        done();
    });
});