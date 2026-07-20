let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test malformed captures error', function() {
        assert.throws(() => {
            new _spacl_core.Matcher('/api/user:');
        }, /Path contains malformed captures/);
        
        assert.throws(() => {
            new _spacl_core.Matcher('/api:/users');
        }, /Path contains malformed captures/);
    });
    
    })