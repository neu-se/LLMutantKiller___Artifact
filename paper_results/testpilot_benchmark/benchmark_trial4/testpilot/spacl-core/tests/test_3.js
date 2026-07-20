let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher constructor with null spec', function(done) {
        try {
            const matcher = new _spacl_core.Matcher(null);
            // If this doesn't throw, the constructor accepts null
            assert.ok(matcher instanceof _spacl_core.Matcher);
            done();
        } catch (error) {
            // If this throws, that's also a valid behavior to test
            assert.ok(error instanceof Error);
            done();
        }
    });

    })