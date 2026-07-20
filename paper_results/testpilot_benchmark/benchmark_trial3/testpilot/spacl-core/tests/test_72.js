let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule constructor', function(done) {
        // Test constructor with string spec
        const rule1 = new _spacl_core.Rule('/api/users/*');
        assert.ok(rule1.regex);
        assert.deepEqual(rule1.verbs, {});
        
        // Test static constructor
        const rule2 = _spacl_core.Rule.for('/api/posts/*');
        assert.ok(rule2.regex);
        assert.deepEqual(rule2.verbs, {});
        
        done();
    });
});