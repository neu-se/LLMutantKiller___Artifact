let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher constructor with default version', function(done) {
        try {
            const spec = { 
                pattern: 'test',
                match: function(input) {
                    return input === this.pattern;
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