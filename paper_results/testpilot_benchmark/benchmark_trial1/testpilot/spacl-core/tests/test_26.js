```javascript
let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule', function(done) {
        // Test constructor with string spec
        let rule1 = new _spacl_core.Rule('/api/users/*');
        assert(rule1.regex !== null);
        assert.deepEqual(rule1.verbs, {});

        // Test static constructor
        let rule2 = _spacl_core.Rule.for('/api/posts/*');
        assert(rule2.regex !== null);
        assert.deepEqual(rule2.verbs, {});

        // Test allow method
        rule1.allow('GET', 'POST');
        assert.equal(rule1.verbs['GET'], true);
        assert.equal(rule1.verbs['POST'], true);
        
        // Test deny method
        rule1.deny('DELETE');
        assert.equal(rule1.verbs['DELETE'], false);
        
        // Test that deny overrides allow
        rule1.allow('PUT');
        assert.equal(rule1.verbs['PUT'], true);
        rule1.deny('PUT');
        assert.equal(rule1.verbs['PUT'], false);
        rule1.allow('PUT'); // Should have no effect since deny overrides
        assert.equal(rule1.verbs['PUT'], false);

        // Test method chaining
        let rule3 = new _spacl_core.Rule('/test/*')
            .allow('GET', 'POST')
            .deny('DELETE');
        assert.equal(rule3.verbs['GET'], true);
        assert.equal(rule3.verbs['POST'], true);
        assert.equal(rule3.verbs['DELETE'], false);

        // Test clone method
        let rule4 = rule3.clone();
        assert.equal(rule4.verbs['GET'], true);
        assert.equal(rule4.verbs['POST'], true);
        assert.equal(rule4.verbs['DELETE'], false);
        
        // Modify original and verify clone is independent
        rule3.allow('PATCH');
        assert.equal(rule3.verbs['PATCH'], true);
        assert.equal(rule4.verbs['PATCH'], undefined);

        // Test clone with new spec
        let rule5 = rule3.clone('/different/path/*');
        assert.equal(rule5.verbs['GET'], true);
        assert.equal(rule5.verbs['POST'], true);
        assert.equal(rule5.verbs['DELETE'], false);

        done();
    });

    it('test Rule query method', function(done) {
        let rule = new _spacl_core.Rule('/api/users/*')
            .allow('GET', 'POST')
            .deny('DELETE');

        // Mock the matches method to control path matching
        rule.matches = function(path, ctx) {
            return path.startsWith('/api/users/');
        };

        // Test allowed verb
        assert.equal(rule.query('/api/users/123', 'GET'), true);
        assert.equal(rule.query('/api/users/456', 'POST'), true);
        
        // Test denied verb
        assert.equal(rule.query('/api/users/123', 'DELETE'), false);
        
        // Test unknown verb
        assert.equal(rule.query('/api/users/123', 'PATCH'), null);
        
        // Test non-matching path
        assert.equal(rule.query('/api/posts/123', 'GET'), null);

        done();
    });

    it('test Rule matches method', function(done) {
        // Create a mock matcher to test the matches method
        let mockMatcher = {
            props: []
        };
        
        let rule = new _spacl_core.Rule(mockMatcher);
        
        // Mock the path.match method
        let originalMatch = String.prototype.match;
        String.prototype.match = function(regex) {
            if (this === '/api/users/123