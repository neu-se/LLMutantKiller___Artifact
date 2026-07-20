let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test valid path specifications', function() {
        // These should not throw errors
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api/users');
        });
        
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api/users/123');
        });
        
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api_v1/users-list');
        });
        
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api/users.json');
        });
        
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api/users~backup');
        });
        
        assert.doesNotThrow(() => {
            new _spacl_core.Matcher('/api/$special+path');
        });
    });
});