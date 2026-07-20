let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no arguments bound', function(done) {
        function simpleFunction(x) {
            return q.resolve(x * 2);
        }
        
        let promiseFunc = q.makePromise(simpleFunction);
        let boundFunc = promiseFunc.fbind();
        
        boundFunc(5).then(function(result) {
            assert.equal(result, 10);
            done();
        }).catch(done);
    });
});