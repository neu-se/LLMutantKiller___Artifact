let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with numeric property', function(done) {
        let obj = { count: 42, active: true };
        
        q.get(obj, 'count')
            .then(function(result) {
                assert.strictEqual(result, 42);
                done();
            })
            .catch(done);
    });
});