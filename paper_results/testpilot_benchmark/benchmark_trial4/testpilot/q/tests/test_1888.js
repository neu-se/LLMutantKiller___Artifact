let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind with promise object', function(done) {
        function asyncFunc(x, y) {
            return q.resolve(x * y);
        }
        
        // q.fbind expects a function, not a promise
        // So we should bind the function directly
        let boundFunc = q.fbind(asyncFunc, 5);
        let result = boundFunc(4);
        
        q.when(result).then(function(value) {
            assert.equal(value, 20);
            done();
        }).catch(done);
    });
});