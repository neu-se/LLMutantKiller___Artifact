let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test fapply with non-function promise', function(done) {
        let nonFunction = "not a function";
        let promise = q(nonFunction);
        
        promise.fapply([1, 2, 3])
            .then(function() {
                done(new Error('Should have failed when trying to apply non-function'));
            })
            .catch(function(error) {
                assert(error instanceof TypeError);
                done();
            });
    });
});