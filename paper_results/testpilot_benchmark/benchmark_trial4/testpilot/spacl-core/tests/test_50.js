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
        
        // Test allowed verb
        mockPath.path = '/api/users/123';
        assert.equal(rule.query(mockPath, 'read'), true);
        
        // Test denied verb
        assert.equal(rule.query(mockPath, 'delete'), false);
        
        // Test unknown verb
        assert.equal(rule.query(mockPath, 'update'), null);
        
        // Test non-matching path
        mockPath.path = '/api/posts/123';
        assert.equal(rule.query(mockPath, 'read'), null);
        
        done();
    });

    