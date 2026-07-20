let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    describe('@spacl/core.Matcher.for', function() {
        
        it('should create a matcher with default version', function(done) {
            try {
                const matcher = _spacl_core.Matcher.for('/user/+');
                assert(matcher !== null, 'Matcher should be created');
                assert(matcher !== undefined, 'Matcher should be defined');
                done();
            } catch (error) {
                done(error);
            }
        });

    })
})