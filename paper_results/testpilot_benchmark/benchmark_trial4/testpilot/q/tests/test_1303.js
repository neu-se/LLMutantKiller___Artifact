let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with null value', function(done) {
        q.when(null,
            function(value) {
                assert.equal(value, null);
                done();
            },
            function(error) {
                done(error);
            }
        );
    });

    })