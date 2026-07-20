let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.fbind - no pre-bound arguments', function(done) {
        function simpleFunction(x) {
            return x * 2;
        }
        
        let promiseFunction = q.makePromise(simpleFunction);
        let boundFunction = promiseFunction.fbind(null);
        
        boundFunction(5)
            .then(function(result) {
                assert.equal(result, 10);
                done();
            })
            .catch(done);
    });

    })