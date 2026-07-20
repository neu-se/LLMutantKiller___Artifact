let assert = require('assert');

describe('test q', function() {
    it('should fulfill undefined values', function(done) {
        let result = Promise.resolve(undefined);
        
        result.then(function(value) {
            assert.strictEqual(value, undefined);
            done();
        }).catch(done);
    });
});