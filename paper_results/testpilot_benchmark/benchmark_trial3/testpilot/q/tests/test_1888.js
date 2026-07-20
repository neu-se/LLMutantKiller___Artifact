let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.fbind - with no additional arguments', function(done) {
        function testFunction(x) {
            return this.multiplier * x;
        }
        
        let obj = { multiplier: 5 };
        let boundFunction = q.fbind(testFunction, obj);
        
        boundFunction(4).then(function(result) {
            assert.equal(result, 20); // 5 * 4
            done();
        }).catch(done);
    });
});