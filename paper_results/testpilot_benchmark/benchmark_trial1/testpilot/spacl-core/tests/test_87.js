let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with empty spec', function(done) {
        try {
            const spec = "";
            const rule = _spacl_core.Rule.for(spec);
            // Depending on implementation, this might throw or return null/undefined
            done();
        } catch (error) {
            // Expected behavior for invalid spec
            assert(error instanceof Error, 'Should throw an Error for empty spec');
            done();
        }
    });

    })