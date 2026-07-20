let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.makePromise.prototype.join - undefined vs null should fail', function(done) {
        let promise1 = q.resolve(undefined);
        let promise2 = q.resolve(null);
        
        promise1.join(promise2)
            .then(function(result) {
                done(new Error('Expected an error to be thrown'));
            })
            .catch(function(error) {
                assert(error instanceof Error);
                assert(error.message.includes("Q can't join: not the same"));
                done();
            });
    });

    })