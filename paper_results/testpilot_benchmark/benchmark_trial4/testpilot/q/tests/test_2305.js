let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.npost - nonexistent method', function(done) {
        let testObj = {};

        q.npost(testObj, 'nonexistent', [])
            .then(function(result) {
                done(new Error('Should have thrown an error'));
            })
            .catch(function(error) {
                assert(error instanceof TypeError);
                done();
            });
    });
});