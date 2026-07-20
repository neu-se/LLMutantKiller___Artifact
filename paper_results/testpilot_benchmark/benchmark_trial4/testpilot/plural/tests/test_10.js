let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with string replacement', function(done) {
        // Add a rule that replaces words ending with 'y' with 'ies'
        plural.addRule(/y$/i, function(word) {
            return word.replace(/y$/i, 'ies');
        });
        
        // Test the rule
        let result = plural('city');
        assert.equal(result, 'cities');
        
        done();
    });
    
})