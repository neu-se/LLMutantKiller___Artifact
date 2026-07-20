let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.for with object spec', function(done) {
        try {
            const spec = {
                effect: 'allow',
                subject: 'user',
                action: 'read',
                resource: 'document'
            };
            const rule = _spacl_core.Rule.for(spec);
            assert(rule !== null, 'Rule should not be null');
            assert(typeof rule === 'object', 'Rule should be an object');
            done();
        } catch (error) {
            done(error);
        }
    });

    })