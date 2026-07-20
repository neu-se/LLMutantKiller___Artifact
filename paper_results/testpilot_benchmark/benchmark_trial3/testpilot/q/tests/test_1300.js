let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with resolved value', function(done) {
        q.when(42, function(value) {
            assert.equal(value, 42);
            done();
        }, function(error) {
            done(error);
        });
    });

    })