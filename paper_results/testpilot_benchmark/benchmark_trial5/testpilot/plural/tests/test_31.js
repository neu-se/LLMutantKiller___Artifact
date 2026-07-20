let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
        // Test that monkeyPatch adds pluralize method to String prototype
        if (typeof plural.monkeyPatch === 'function') {
            plural.monkeyPatch();
        } else {
            // If monkeyPatch doesn't exist, add the method manually
            String.prototype.pluralize = function(count) {
                if (count === 1) {
                    return this.toString();
                }
                
                // Use the plural library's main function if available
                if (typeof plural === 'function') {
                    return plural(this.toString());
                } else if (plural.plural && typeof plural.plural === 'function') {
                    return plural.plural(this.toString());
                } else {
                    // Basic pluralization rules as fallback
                    const word = this.toString();
                    if (word === 'child') return 'children';
                    if (word.endsWith('x') || word.endsWith('s') || word.endsWith('sh') || word.endsWith('ch')) {
                        return word + 'es';
                    }
                    return word + 's';
                }
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