let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with synchronous method', function(done) {
        let testObject = {
            add: function(a, b) {
                return a + b;
            }
        };
        
        q.post(testObject, 'add', [5, 3])
            .then(function(result) {
                assert.equal(result, 8);
                done();
            })
            .catch(done);
    });
});