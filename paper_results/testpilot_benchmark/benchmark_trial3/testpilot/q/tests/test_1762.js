let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.post with method that returns a value', function(done) {
        let testObject = {
            add: function(a, b) {
                return a + b;
            }
        };
        
        let promise = q.post(testObject, 'add', [5, 3]);
        
        promise.then(function(result) {
            assert.equal(result, 8);
            done();
        }).catch(done);
    });
});