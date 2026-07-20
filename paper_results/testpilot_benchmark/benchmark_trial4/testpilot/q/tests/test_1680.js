let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.get with undefined property', function(done) {
        let obj = { name: 'Alice' };
        
        q.get(obj, 'nonexistent')
            .then(function(result) {
                assert.strictEqual(result, undefined);
                done();
            })
            .catch(done);
    });
});