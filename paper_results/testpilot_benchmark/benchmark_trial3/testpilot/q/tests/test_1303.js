let mocha = require('mocha');
let assert = require('assert');
let q = require('q');

describe('test q', function() {
    it('test q.when with fulfilled callback transformation', function(done) {
        q.when(10, function(value) {
            return value * 2;
        }).then(function(result) {
            assert.equal(result, 20);
            done();
        }).catch(done);
    });

    })