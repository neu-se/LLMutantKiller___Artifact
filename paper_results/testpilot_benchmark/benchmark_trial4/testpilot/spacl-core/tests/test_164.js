let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with null spec', function(done) {
        try {
            const rule = _spacl_core.Rule.for(null);
            done(new Error('Should have thrown an error for null spec'));
        } catch (error) {
            assert(error instanceof Error, 'Should throw an error for null spec');
            done();
        }
    });

    })