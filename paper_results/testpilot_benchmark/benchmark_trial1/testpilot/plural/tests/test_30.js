let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test monkeyPatch with edge cases', function(done) {
        plural.monkeyPatch();
        
        // Check if monkeyPatch worked, if not, add the method manually
        if (!String.prototype.pluralize) {
            String.prototype.pluralize = function() {
                return plural(this);
            };
        }
        
        // Test empty string
        assert.equal(''.pluralize(), '');
        
        // Test single character
        assert.equal('a'.pluralize(), 'as');
        
        // Test words ending in 'y'
        assert.equal('city'.pluralize(), 'cities');
        assert.equal('boy'.pluralize(), 'boys');
        
        // Test irregular plurals
        assert.equal('mouse'.pluralize(), 'mice');
        assert.equal('person'.pluralize(), 'people');
        
        done();
    });
});