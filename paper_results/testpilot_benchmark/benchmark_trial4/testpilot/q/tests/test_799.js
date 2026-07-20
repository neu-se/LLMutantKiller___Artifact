let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - all arguments bound', function(done) {
        function addNumbers(a, b, c) {
            return q.resolve(a + b + c);
        }
        
        let promiseFunc = q.makePromise(addNumbers);
        let boundFunc = promiseFunc.fbind(1, 2, 3);
        
        boundFunc().then(function(result) {
            assert.equal(result, 6);
            done();
        }).catch(done);
    });
});