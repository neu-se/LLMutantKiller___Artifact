let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test empty segments error', function() {
        assert.throws(() => {
            new _spacl_core.Matcher('/api//users');
        }, /Path contains empty segments/);
    });
    
    