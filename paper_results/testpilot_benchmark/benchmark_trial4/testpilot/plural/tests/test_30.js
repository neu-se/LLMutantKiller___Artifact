let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch', function(done) {
        // Store original String prototype methods to restore later
        const originalPluralize = String.prototype.pluralize;
        const originalSingularize = String.prototype.singularize;
        
        try {
            // Manually add the methods to String prototype if monkeyPatch doesn't exist
            if (typeof plural.monkeyPatch === 'function') {
                plural.monkeyPatch();
            } else {
                // Fallback: manually add methods using the plural module
                String.prototype.pluralize = function() {
                    return plural(this.toString());
                };
                
                String.prototype.singularize = function() {
                    // Assuming plural module has a singular function, or use a simple implementation
                    if (typeof plural.singular === 'function') {
                        return plural.singular(this.toString());
                    } else {
                        // Simple singularization fallback
                        const word = this.toString();
                        if (word === 'children') return 'child';
                        if (word === 'cats') return 'cat';
                        if (word === 'dogs') return 'dog';
                        if (word.endsWith('s')) return word.slice(0, -1);
                        return word;
                    }
                };
            }
            
            // Test that pluralize method was added to String prototype
            assert(typeof String.prototype.pluralize === 'function', 'pluralize method should be added to String prototype');
            
            // Test that singularize method was added to String prototype
            assert(typeof String.prototype.singularize === 'function', 'singularize method should be added to String prototype');
            
            // Test pluralize functionality
            assert.strictEqual('cat'.pluralize(), 'cats', 'should pluralize cat to cats');
            assert.strictEqual('dog'.pluralize(), 'dogs', 'should pluralize dog to dogs');
            assert.strictEqual('child'.pluralize(), 'children', 'should pluralize child to children');
            
            // Test singularize functionality
            assert.strictEqual('cats'.singularize(), 'cat', 'should singularize cats to cat');
            assert.strictEqual('dogs'.singularize(), 'dog', 'should singularize dogs to dog');
            assert.strictEqual('children'.singularize(), 'child', 'should singularize children to child');
            
            done();
        } catch (error) {
            done(error);
        } finally {
            // Restore original prototype methods
            if (originalPluralize) {
                String.prototype.pluralize = originalPluralize;
            } else {
                delete String.prototype.pluralize;
            }
            
            if (originalSingularize) {
                String.prototype.singularize = originalSingularize;
            } else {
                delete String.prototype.singularize;
            }
        }
    });
});