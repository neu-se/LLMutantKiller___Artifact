let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher constructor with empty spec', function(done) {
        try {
            const spec = {
                match: function() {
                    // Empty match function
                }
            };
            const matcher = new _spacl_core.Matcher(spec);
            assert.ok(matcher instanceof _spacl_core.Matcher);
            done();
        } catch (error) {
            done(error);
        }
    });
});