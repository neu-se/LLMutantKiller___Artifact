let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test path must begin with slash error', function() {
        assert.throws(() => {
            new _spacl_core.Matcher('api/users');
        }, /Path must begin with a slash/);
    });
    
    })