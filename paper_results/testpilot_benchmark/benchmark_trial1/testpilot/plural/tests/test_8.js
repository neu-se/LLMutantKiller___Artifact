let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule with case insensitive matching', function(done) {
        // Add a rule for words ending in 'us' -> 'i'
        plural.addRule(/us$/i, 'i');
        
        let result1 = plural('cactus');
        let result2 = plural('FOCUS');
        assert.equal(result1, 'cacti');
        assert.equal(result2, 'FOCI');
        
        done();
    });
});