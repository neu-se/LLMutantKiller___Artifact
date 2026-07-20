let _spacl_core = require('@spacl/core');

describe('test _spacl_core', function() {
    it('test @spacl/core.Rule.prototype.deny method chaining', function(done) {
        try {
            let rule = new _spacl_core.Rule();
            
            // Test that deny can be chained with other methods
            let result = rule.deny('read').deny('write');
            
            // Verify chaining works
            if (result !== rule) {
                throw new Error('Method chaining failed: deny() should return the same rule instance');
            }
            
            done();
        } catch (error) {
            done(error);
        }
    });
});