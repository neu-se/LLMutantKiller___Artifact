let mocha = require('mocha');
let assert = require('assert');
let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Policy.prototype.query', function(done) {
        // Test 1: Empty policy returns null
        const emptyPolicy = new _spacl_core.Policy();
        const result1 = emptyPolicy.query('/test', 'GET', {});
        assert.strictEqual(result1, null);

        // Test 2: Policy with one allowing rule returns true
        const allowingRule = {
            query: function(path, verb, ctx) {
                return true;
            }
        };
        const allowingPolicy = new _spacl_core.Policy();
        allowingPolicy.rules = [allowingRule];
        const result2 = allowingPolicy.query('/test', 'GET', {});
        assert.strictEqual(result2, true);

        // Test 3: Policy with one denying rule returns false
        const denyingRule = {
            query: function(path, verb, ctx) {
                return false;
            }
        };
        const denyingPolicy = new _spacl_core.Policy();
        denyingPolicy.rules = [denyingRule];
        const result3 = denyingPolicy.query('/test', 'GET', {});
        assert.strictEqual(result3, false);

        // Test 4: Policy with mixed rules - deny takes precedence
        const neutralRule = {
            query: function(path, verb, ctx) {
                return null;
            }
        };
        const mixedPolicy = new _spacl_core.Policy();
        mixedPolicy.rules = [allowingRule, denyingRule, neutralRule];
        const result4 = mixedPolicy.query('/test', 'GET', {});
        assert.strictEqual(result4, false);

        // Test 5: Policy with allowing and neutral rules returns true
        const allowNeutralPolicy = new _spacl_core.Policy();
        allowNeutralPolicy.rules = [neutralRule, allowingRule, neutralRule];
        const result5 = allowNeutralPolicy.query('/test', 'GET', {});
        assert.strictEqual(result5, true);

        // Test 6: Policy with only neutral rules returns null
        const neutralPolicy = new _spacl_core.Policy();
        neutralPolicy.rules = [neutralRule, neutralRule];
        const result6 = neutralPolicy.query('/test', 'GET', {});
        assert.strictEqual(result6, null);

        // Test 7: Verify parameters are passed correctly to rules
        let capturedParams = {};
        const paramCapturingRule = {
            query: function(path, verb, ctx) {
                capturedParams = { path, verb, ctx };
                return true;
            }
        };
        const paramPolicy = new _spacl_core.Policy();
        paramPolicy.rules = [paramCapturingRule];
        const testPath = '/api/users';
        const testVerb = 'POST';
        const testCtx = { user: 'admin' };
        paramPolicy.query(testPath, testVerb, testCtx);
        assert.strictEqual(capturedParams.path, testPath);
        assert.strictEqual(capturedParams.verb, testVerb);
        assert.deepStrictEqual(capturedParams.ctx, testCtx);

        done();
    });
});