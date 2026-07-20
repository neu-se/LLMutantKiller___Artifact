let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test query method', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        rule.allow('read').deny('write');
        
        // Mock path object with match method
        const mockPath = {
            path: '/api/users/123',
            match: function(regex) {
                // Simple mock that returns a match for paths starting with /api/users/
                if (this.path.startsWith('/api/users/')) {
                    return [this.path, this.path.spl]}}}    })
})