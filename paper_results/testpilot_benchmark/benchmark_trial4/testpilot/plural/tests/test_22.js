let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.monkeyPatch does not throw errors', function(done) {
        try {
            // Test that monkeyPatch can be called without throwing
            plural.monkeyPatch();
            
            // Test that calling it multiple times doesn't break anything
            plural.monkeyPatch();
            plural.monkeyPatch();
            
            done();
        } catch (error) {
            done(error);
        } finally {
            // Clean up
            delete String.prototype.pluralize;
            delete String.prototype.singularize;
        }
    });
    
    })