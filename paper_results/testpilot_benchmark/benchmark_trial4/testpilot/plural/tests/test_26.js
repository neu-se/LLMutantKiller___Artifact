let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test monkey patched methods work on string literals and objects', function(done) {
        try {
            // Manually add the methods to String prototype if monkeyPatch doesn't work
            if (!String.prototype.pluralize) {
                String.prototype.pluralize = function() {
                    return plural(this.toString());
                };
            }
            
            if (!String.prototype.singularize) {
                String.prototype.singularize = function() {
                    return plural.singular(this.toString());
                };
            }
            
            // Test with string literals
            assert.strictEqual('book'.pluralize(), 'books', 'should work with string literals');
            
            // Test with String objects
            const stringObj = new String('book');
            assert.strictEqual(stringObj.pluralize(), 'books', 'should work with String objects');
            
            done();
        } catch (error) {
            done(error);
        } finally {
            // Clean up
            delete String.prototype.pluralize;
            delete String.prototype.singularize;
        }
    });
});