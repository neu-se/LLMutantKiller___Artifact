let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Matcher constructor with custom version', function(done) {
        try {
            const spec = { pattern: 'test' };
            const version = '2.0';
            const matcher = new _spacl_core.Matcher(spec, version);
            assert.ok(matcher instanceof _spacl_core.Matcher);
            done();
        } catch (error) {
            done(error);
        }
    });

    })