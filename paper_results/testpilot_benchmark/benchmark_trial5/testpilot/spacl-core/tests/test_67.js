let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test matches method', function(done) {
        const rule = new _spacl_core.Rule('/api/users/*');
        
        // Mock regex with props
        rule.regex = {
            props: [],
            test: function() { return true; }
        };
        
        // Mock path object
        const mockPath = {
            match: function(regex) {
                if (this.path.startsWith('/api/users/')) {
                    return [this.path];
                }
                return null;
            },
            path: ''
        };
        
        // Test matching path
        mockPath.path = '/api/users/123';
        assert.equal(rule.matches(mockPath), true);
        
        // Test non-matching path
        mockPath.path = '/api/posts/123';
        assert.equal(rule.matches(mockPath), false);
        
        done();
    });

    })