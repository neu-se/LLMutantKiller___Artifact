let mocha = require('mocha');
let assert = require('assert');
let plural = require('plural');

describe('test plural', function() {
    it('test plural.addRule adds rule and returns plural object', function(done) {
        // Test that addRule returns the plural object for chaining
        let result = plural.addRule(/test$/, 'tests');
        assert.strictEqual(result, plural, 'addRule should return the plural object');
        done();
    });

    })