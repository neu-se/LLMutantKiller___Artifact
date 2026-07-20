let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no additional arguments', function(done) {
        function simpleFunction() {
            return 'hello world';
        }
        
        let promiseFunction = q.denodeify(simpleFunction);
        let boundFunction = promiseFunction.fbind(null);
        
        boundFunction()
            .then(function(result) {
                assert.equal(result, 'hello world');
                done();
            })
            .catch(done);
    });
});