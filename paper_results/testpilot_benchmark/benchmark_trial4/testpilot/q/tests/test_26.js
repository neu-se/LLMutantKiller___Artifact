let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('should fulfill null values', function(done) {
        let result = q(null);
        
        result.then(function(value) {
            assert.strictEqual(value, null);
            done();
        }).catch(done);
    });
});