let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('/').pop()];
                }
                return null;
            },
            path: ''
        };
        
        // Mock regex with props
        rule.regex.props = [];
        
        // Test matching path
        mockPath.path = '/api/users/123';
        assert.equal(rule.matches(mockPath), true);
        
        // Test non-matching path
        mockPath.path = '/api/posts/123';
        assert.equal(rule.matches(mockPath), false);
        
        done();
    });

    