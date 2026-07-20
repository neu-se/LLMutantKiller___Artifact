let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - edge cases', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test edge cases
            let emptyPath = rule.query('', 'GET', {});
            let rootPath = rule.query('/', 'GET', {});
            let longPath = rule.query('/api/v1/users/123/posts/456/comments/789', 'GET', {});
            let nullCtx = rule.query('/test', 'GET', null);
            
            assert(emptyPath !== undefined, 'Query with empty path should return defined result');
            assert(rootPath !== undefined, 'Query with root path should return defined result');
            assert(longPath !== undefined, 'Query with long path should return defined result');
            assert(nullCtx !== undefined, 'Query with null context should return defined result');
            
            done();
        } catch (error) {
            done(error);
        }
    });

    })