let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with successful function', function(done) {
        function add(a, b) {
            return a + b;
        }
        
        let boundAdd = q.fbind(add, 5);
        let promise = boundAdd(3);
        
        promise.then(function(result) {
            assert.equal(result, 8);
            done();
        }).catch(done);
    });
    
});