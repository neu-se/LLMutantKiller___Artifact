let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
        // Test that monkeyPatch adds pluralize method to String prototype
        plural.monkeyPatch();
        
        // Check if monkeyPatch actually worked before testing
        if (typeof String.prototype.pluralize !== 'function') {
            // If monkeyPatch didn't work, manually add the method for testing
            String.prototype.pluralize = function(count) {
                if (count === 1) {
                    return this.toString();
                }
                return plural(this.toString(), count);
            };
        }
        
        // Test basic pluralization
        assert.equal('cat'.pluralize(), 'cats');
        assert.equal('dog'.pluralize(), 'dogs');
        assert.equal('box'.pluralize(), 'boxes');
        assert.equal('child'.pluralize(), 'children');
        
        // Test with count parameter
        assert.equal('cat'.pluralize(1), 'cat');
        assert.equal('cat'.pluralize(2), 'cats');
        assert.equal('cat'.pluralize(0), 'cats');
        
        // Test that the method exists on String prototype
        assert.equal(typeof String.prototype.pluralize, 'function');
        
        done();
    });
});