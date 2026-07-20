let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.query - different HTTP verbs', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test different HTTP verbs
            let getResult = rule.query('/api/data', 'GET', {});
            let postResult = rule.query('/api/data', 'POST', {});
            let putResult = rule.query('/api/data', 'PUT', {});
            let deleteResult = rule.query('/api/data', 'DELETE', {});
            
            // Verify all verbs return defined results
            assert(getResult !== undefined, 'GET query should return defined result');
            assert(postResult !== undefined, 'POST query should return defined result');
            assert(putResult !== undefined, 'PUT query should return defined result');
            assert(deleteResult !== undefined, 'DELETE query should return defined result');
            
            done();
        } catch (error) {
            done(error);
        }
    });
});