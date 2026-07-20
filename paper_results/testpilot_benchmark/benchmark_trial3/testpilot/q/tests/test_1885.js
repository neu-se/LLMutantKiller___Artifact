let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind - with multiple pre-bound arguments', function(done) {
        function sum(a, b, c, d) {
            return a + b + c + d + this.base;
        }
        
        let obj = { base: 100 };
        let boundFunction = q.fbind(sum, obj, 1, 2, 3);
        
        boundFunction(4).then(function(result) {
            assert.equal(result, 110); // 1 + 2 + 3 + 4 + 100
            done();
        }).catch(done);
    });
});